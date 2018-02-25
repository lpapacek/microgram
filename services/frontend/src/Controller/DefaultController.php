<?php

namespace App\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\User;

class DefaultController extends Controller
{
    /**
     * @Route("/", name="homepage")
     */
    public function indexAction(Request $request)
    {
        // replace this example code with whatever you need
        return $this->render('default/index.html.twig', [
            'base_dir' => realpath($this->getParameter('kernel.project_dir')).DIRECTORY_SEPARATOR,
        ]);
    }

    /**
    * @Route("/login", name="login")
    */
    public function loginAction(Request $request) {
        $user = $this->getUser();
        if ($user instanceof UserInterface) {
            return $this->redirectToRoute('homepage');
        }

        $exception = $this
            ->get('security.authentication_utils')
            ->getLastAuthenticationError();

        $user = new User();
        $form = $this->createForm('App\Form\LoginType', $user);

        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            
            dump($exception);
            die();

            return $this->redirectToRoute('homepage');
        }

    //    $form->get('username')->addError(new FormError('xxxx'));

        return $this->render('default/login.html.twig', [
            'form' => $form->createView(),
            'error' => $exception ? $exception->getMessage() : NULL,
        ]);
    }

    /**
    * @Route("/register", name="register")
    */
    public function registerAction(Request $request)
    {
        dump('1');
        die();
        $user = $this->getUser();
        if ($user instanceof UserInterface) {
            return $this->redirectToRoute('homepage');
        }

        /** @var AuthenticationException $exception */
        $exception = $this->get('security.authentication_utils')->getLastAuthenticationError();

        return $this->render('default/register.html.twig', [
            'error' => $exception ? $exception->getMessage() : NULL,
        ]);
    }
}
