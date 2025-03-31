package br.com.fiap.reticketify.user.domain.repository;

import br.com.fiap.reticketify.user.domain.entity.UserEntity;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<UserEntity, Integer> {
    UserEntity findByUsernameAndPassword(String username, String password);
}
