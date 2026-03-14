package org.techalfa.auth.security;

import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.techalfa.auth.entity.UserAccount;

import java.util.Collection;
import java.util.List;

@Getter
public class AuthenticatedUser implements UserDetails {

    private final Long id;
    private final String email;
    private final String password;
    private final boolean verified;
    private final Collection<? extends GrantedAuthority> authorities;

    public AuthenticatedUser(UserAccount user) {
        this.id = user.getId();
        this.email = user.getEmail();
        this.password = user.getPasswordHash();
        this.verified = user.isEmailVerified();
        this.authorities = List.of(new SimpleGrantedAuthority("ROLE_" + user.getRoleName().name()));
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }
}
