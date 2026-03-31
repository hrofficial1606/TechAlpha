package org.techalfa.auth.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.techalfa.auth.entity.UserAccount;

import java.util.Optional;
import java.util.List;

public interface UserAccountRepository extends JpaRepository<UserAccount, Long> {
    Optional<UserAccount> findByEmailIgnoreCase(String email);

    List<UserAccount> findByEmailVerifiedTrue();
}
