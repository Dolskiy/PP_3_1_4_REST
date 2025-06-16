package ru.kata.spring.boot_security.demo.service;

import ru.kata.spring.boot_security.demo.model.Role;

import java.util.List;
import java.util.stream.Stream;

public interface RoleService {

    List<Role> findAllRoles();

    Role findRoleById(Long id);

    Role saveRole(Role role);

    Role updateRole(Long id, Role role);

    void deleteRole(Long id);

    Stream<Role> streamAllRoles();
}
