package com.textmessenger;

import com.textmessenger.model.entity.User;
import com.textmessenger.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class RuntimeAddToDataBase {
    @Autowired
    PasswordEncoder passwordEncoder;

    @Bean
    public CommandLineRunner createPassword(UserRepository userRepository) {
        return new CommandLineRunner() {
            @Override
            public void run(String... args) {
                User user = new User();
                user.setEmail("admin@gmail.com");
                user.setLogin("admin");
                user.setEnabled(true);
                user.setPassword(passwordEncoder.encode("admin"));
                userRepository.save(user);
            }
        };
    }
}
