package br.com.fiap.reticketify.user.controller;

import br.com.fiap.reticketify.user.api.UserApi;
import br.com.fiap.reticketify.user.domain.entity.UserEntity;
import br.com.fiap.reticketify.user.domain.repository.UserRepository;
import br.com.fiap.reticketify.user.model.User;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1")
public class UserController implements UserApi {

    private final UserRepository userRepository;

    @Override
    public ResponseEntity<Void> createUser(User user) {

        UserEntity userEntity = UserEntity.builder()
                .uuid(UUID.randomUUID().toString())
                .username(user.getUsername())
                .password(user.getPassword())
                .cpf(user.getCpf())
                .name(user.getName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .build();

        this.userRepository.save(userEntity);

        String location = String.format("/api/v1/user/%s", userEntity.getUuid());

        return ResponseEntity.status(HttpStatus.CREATED).header("Location", location).build();
    }
}
