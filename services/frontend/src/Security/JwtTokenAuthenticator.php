<?php

namespace App\Security;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Guard\AbstractGuardAuthenticator;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Core\User\UserProviderInterface;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Routing\RouterInterface;

use Lexik\Bundle\JWTAuthenticationBundle\TokenExtractor\AuthorizationHeaderTokenExtractor;
use Lexik\Bundle\JWTAuthenticationBundle\Encoder\JWTEncoderInterface;

use App\Provider\UserProvider;

class JwtTokenAuthenticator extends AbstractGuardAuthenticator {

	/**
   	* @var \Symfony\Component\Routing\RouterInterface
   	*/
    private $router;
    private $jwtEncoder;

  	/**
   	* Creates a new instance of Guard
   	*/
  	public function __construct(RouterInterface $router, JWTEncoderInterface $jwtEncoder) {
      $this->router = $router;
      $this->jwtEncoder = $jwtEncoder;
    }
    
    /**
     * Called on every request to decide if this authenticator should be
     * used for the request. Returning false will cause this authenticator
     * to be skipped.
     */
    public function supports(Request $request) {
      $extractor = new AuthorizationHeaderTokenExtractor(
        'Bearer',
        'Authorization'
      );
      $token = $extractor->extract($request);

      // IF token && not expired, return true
      // ELSE return false (aquire new token)
      if ($token && true) {
        return false;
      }

      return true;
    }

	  /**
     * Called on every request. Return whatever credentials you want to
     * be passed to getUser() as $credentials.
     */
    public function getCredentials(Request $request) {
      $credentials = null;
      if ($request->getPathInfo() == '/login' && $request->isMethod('POST')) {
        // Get credentials from login form
        $credentials = [
          'username' => $request->request->get('username'),
          'password' => $request->request->get('password'),
        ]; 
      } else {
        // Get credentials from existing (but expired) token
        $extractor = new AuthorizationHeaderTokenExtractor(
          'Bearer',
          'Authorization'
        );
        $token = $extractor->extract($request);
        $credentials = [
          'username' => $token['username'],
          'password' => $request->request->get('password'),
        ];
      }

      return $credentials;
    }

    public function getUser($credentials, UserProviderInterface $userProvider) {

      $apiKey = $credentials['token'];

      if (null === $apiKey) {
          return;
      }

      // if a User object, checkCredentials() is called
      return $userProvider->loadUserByUsername($apiKey);
    }

    public function checkCredentials($credentials, UserInterface $user)
    {
      // check credentials - e.g. make sure the password is valid
      // no credential check is needed in this case

      // return true to cause authentication success
      return true;
    }

    public function onAuthenticationSuccess(Request $request, TokenInterface $token, $providerKey)
    {
      // on success, let the request continue
      return null;
    }

    public function onAuthenticationFailure(Request $request, AuthenticationException $exception)
    {
        $data = array(
            'message' => strtr($exception->getMessageKey(), $exception->getMessageData())

            // or to translate this message
            // $this->translator->trans($exception->getMessageKey(), $exception->getMessageData())
        );

        return new JsonResponse($data, Response::HTTP_FORBIDDEN);
    }

    /**
     * Called when authentication is needed, but it's not sent
     */
    public function start(Request $request, AuthenticationException $authException = null)
    {
        $data = array(
            // you might translate this message
            'message' => 'Authentication Required'
        );

        return new JsonResponse($data, Response::HTTP_UNAUTHORIZED);
    }

    public function supportsRememberMe()
    {
        return false;
    }

}
