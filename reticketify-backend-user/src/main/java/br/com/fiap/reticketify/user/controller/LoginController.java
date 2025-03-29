package br.com.fiap.reticketify.user.controller;

import br.com.fiap.reticketify.user.api.LoginApi;
import br.com.fiap.reticketify.user.domain.entity.UserEntity;
import br.com.fiap.reticketify.user.domain.repository.UserRepository;
import br.com.fiap.reticketify.user.model.Login;
import br.com.fiap.reticketify.user.model.User;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@AllArgsConstructor
@RequestMapping("/api/v1")
public class LoginController implements LoginApi {

    private final UserRepository userRepository;

    @Override
    public ResponseEntity<User> loginUser(Login login) {
        UserEntity userEntity = this.userRepository.findByUsernameAndPassword(login.getUsername(), login.getPassword());
        if (userEntity == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
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
}
