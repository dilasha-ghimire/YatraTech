package com.dilasha.yatratechbackend.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private JwtAuthEntryPoint authEntryPoint;
    private final CustomUserDetailsService userDetailsService;
    @Autowired
    public SecurityConfig(CustomUserDetailsService userDetailsService, JwtAuthEntryPoint authEntryPoint) {
        this.userDetailsService = userDetailsService;
        this.authEntryPoint = authEntryPoint;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .exceptionHandling()
                .authenticationEntryPoint(authEntryPoint)
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests()

                .requestMatchers("/api/auth/login").permitAll()
                .requestMatchers("/api/auth/register").permitAll()
                .requestMatchers("/api/auth/get-role/**").permitAll()
                .requestMatchers("/api/auth/update-user").hasRole("USER")
                .requestMatchers("/api/auth/getId/**").hasRole("USER")
                .requestMatchers("/api/auth/users/**").hasRole("USER")
                .requestMatchers("/api/auth/get-all-users").hasRole("ADMIN")
                .requestMatchers("/api/auth/delete-users/**").permitAll()
                .requestMatchers("/api/auth/total-users-records").hasRole("ADMIN")

                .requestMatchers("/api/vehicle/save-vehicle").hasRole("ADMIN")
                .requestMatchers("/api/vehicle/update-vehicle").hasRole("ADMIN")
                .requestMatchers("/api/vehicle/update-vehicle-without-image").hasRole("ADMIN")
                .requestMatchers("/api/vehicle/delete-vehicle/**").hasRole("ADMIN")
                .requestMatchers("/api/vehicle/total-vehicle-records").hasRole("ADMIN")
                .requestMatchers(HttpMethod.GET, "/api/vehicle/find-all-vehicles").permitAll()

                .requestMatchers("/api/order/placeOrder").hasRole("USER")
                .requestMatchers("/api/order/get-all-orders-by-user-id/**").hasRole("USER")
                .requestMatchers("/api/order/ordered-vehicle-ids").hasRole("USER")
                .requestMatchers("/api/order/get-all-orders").hasRole("ADMIN")
                .requestMatchers("/api/order/total-order-records").hasRole("ADMIN")
                .requestMatchers("/api/order/delete-order-by-orderId/**").permitAll()

                .anyRequest().authenticated()
                .and()
                .httpBasic();
        http.addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public  JWTAuthenticationFilter jwtAuthenticationFilter() {
        return new JWTAuthenticationFilter();
    }
}