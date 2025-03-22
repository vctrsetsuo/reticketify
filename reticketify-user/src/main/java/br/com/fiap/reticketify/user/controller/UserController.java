package br.com.fiap.reticketify.user.controller;

import br.com.fiap.reticketify.user.api.UserApi;
import br.com.fiap.reticketify.user.model.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1")
public class UserController implements UserApi {

    @Override
    public ResponseEntity<Void> createUser(User user) {
        String location = String.format("/api/v1/user/%s", UUID.randomUUID().toString());
        return ResponseEntity.status(HttpStatus.CREATED).header("Location", location).build();
    }
}
