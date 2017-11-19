<?php

namespace AppBundle\Security;

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
use Symfony\Component\Ldap\Exception\ConnectionException;

use AppBundle\Provider\UserProvider;

class Guard extends AbstractGuardAuthenticator {

	/**
   	* @var \Symfony\Component\Routing\RouterInterface
   	*/
  	private $router;

  	/**
   	* Creates a new instance of Guard
   	*/
  	public function __construct(RouterInterface $router) {
    	$this->router = $router;
  	}

	/**
     * Called on every request. Return whatever credentials you want to
     * be passed to getUser(). Returning null will cause this authenticator
     * to be skipped.
     */
    public function getCredentials(Request $request) {
      if ($request->getPathInfo() == '/login' && $request->isMethod('POST')) {
        return array(
          'username' => $request->request->get('username'),
          'password' => $request->request->get('password'),
        ); 
      }

      return null;
    }

    public function getUser($credentials, UserProviderInterface $userProvider) {
        if (!$userProvider instanceof UserProvider) {
          return;
        }

        try {
          return $userProvider->loadUserByUsername($credentials['username']);
        } catch (UsernameNotFoundException $e) {
          throw new AuthenticationException($this->failMessage);
        }
    }

    public function checkCredentials($credentials, UserInterface $user) {
        /*$conn = $this->ldapConnection->check_password_ldap();

        // Try LDAP bind
        try {
          $conn->bind($user->getDn(), $credentials['password']);
        } catch (ConnectionException $e) {
          return false;
        }*/
    
        return true;
    }

    public function onAuthenticationSuccess(Request $request, TokenInterface $token, $providerKey) {
        // on success, let the request continue
        // return null;
      $url = $this->router->generate('homepage');
      return new RedirectResponse($url);
    }

    public function onAuthenticationFailure(Request $request, AuthenticationException $exception) {
      $data = array(
          'message' => strtr($exception->getMessageKey(), $exception->getMessageData())
          // or to translate this message
          // $this->translator->trans($exception->getMessageKey(), $exception->getMessageData())
      );

      $request->getSession()->set(Security::AUTHENTICATION_ERROR, $exception);
      $url = $this->router->generate('login');

    	return new RedirectResponse($url);
    }

    /**
     * Called when authentication is needed, but it's not sent
     */
    public function start(Request $request, AuthenticationException $authException = null) {
      $url = $this->router->generate('login');
      return new RedirectResponse($url);
    }

    public function supportsRememberMe() {
        return false;
    }

}
