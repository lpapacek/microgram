<?php

namespace AppBundle\Provider;

use AppBundle\Entity\User;
use Symfony\Component\Security\Core\User\UserProviderInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\Exception\UsernameNotFoundException;
use Symfony\Component\Security\Core\Exception\UnsupportedUserException;


class UserProvider implements UserProviderInterface {

    public function __construct() {
        //
    }

    public function loadUserByUsername($username) {
        dump($username);
        die();
    }

    public function refreshUser(UserInterface $user) {
        if (!$user instanceof LDAPUser) {
            throw new UnsupportedUserException(
                sprintf('Instances of "%s" are not supported.', get_class($user))
            );
        }

        return $this->loadUserByUsername($user->getUsername());
    }

    public function supportsClass($class) {
        return User::class === $class;
    }

}