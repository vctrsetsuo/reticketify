package br.com.fiap.reticketify.user.controller;

import br.com.fiap.reticketify.user.api.UserApi;
import br.com.fiap.reticketify.user.domain.entity.UserEntity;
import br.com.fiap.reticketify.user.domain.repository.UserRepository;
import br.com.fiap.reticketify.user.model.User;
import br.com.fiap.reticketify.user.model.UserData;
import br.com.fiap.reticketify.user.service.WebhookTeamsService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@CrossOrigin
@RestController
@AllArgsConstructor
@RequestMapping("/api/v1")
public class UserController implements UserApi {

    private final UserRepository userRepository;
    private final WebhookTeamsService webhookTeamsService;

    @Override
    public ResponseEntity<User> getUserById(Integer id) {
        UserEntity userEntity = this.userRepository.findById(id).orElse(null);

        if (userEntity == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(
                User.builder()
                        .id(userEntity.getId())
                        .uuid(userEntity.getUuid())
                        .username(userEntity.getUsername())
                        .password(userEntity.getPassword())
                        .cpf(userEntity.getCpf())
                        .name(userEntity.getName())
                        .email(userEntity.getEmail())
                        .phone(userEntity.getPhone())
                        .build()
        );
    }

    @Override
    public ResponseEntity<Void> createUser(UserData user) {

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

        webhookTeamsService.createWebHook("createUser", "O usuário " + user.getUsername() + " foi criado com sucesso!");

        String location = String.format("/api/v1/user/%s", userEntity.getUuid());

        return ResponseEntity.status(HttpStatus.CREATED).header("Location", location).build();
    }

    @Override
    public ResponseEntity<User> updateUser(User user) {
        UserEntity userEntity = UserEntity.builder()
                .id(user.getId())
                .uuid(user.getUuid())
                .username(user.getUsername())
                .password(user.getPassword())
                .cpf(user.getCpf())
                .name(user.getName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .build();

        this.userRepository.save(userEntity);

        webhookTeamsService.createWebHook("updateUser", "O usuário " + user.getUsername() + " foi atualizado com sucesso!");

        return ResponseEntity.ok(
                User.builder()
                        .id(userEntity.getId())
                        .uuid(userEntity.getUuid())
                        .username(userEntity.getUsername())
                        .password(userEntity.getPassword())
                        .cpf(userEntity.getCpf())
                        .name(userEntity.getName())
                        .email(userEntity.getEmail())
                        .phone(userEntity.getPhone())
                        .build()
        );
    }

    @Override
    public ResponseEntity<Void> deleteUser(Integer id) {
        this.userRepository.deleteById(id);
        webhookTeamsService.createWebHook("deleteUser", "O usuário " + id + " foi deletado com sucesso!");
        return ResponseEntity.noContent().build();
    }
}
