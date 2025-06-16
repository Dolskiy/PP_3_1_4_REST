package ru.kata.spring.boot_security.demo.init;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;

import javax.annotation.PostConstruct;
import java.util.List;

@Component
public class Init {

    private final RoleService roleService;
    private final UserService userService;

    @Autowired
    public Init(RoleService roleService, UserService userService) {
        this.roleService = roleService;
        this.userService = userService;
    }

    @PostConstruct
    private void init() {
        roleService.saveRole(new Role(1L, "ROLE_ADMIN"));
        roleService.saveRole(new Role(2L, "ROLE_USER"));

        List<Role> adminRole = roleService.streamAllRoles()
                .filter(role -> role.getName().equals("ROLE_ADMIN"))
                .toList();
        List<Role> userRole = roleService.streamAllRoles()
                .filter(role -> role.getName().equals("ROLE_USER"))
                .toList();

        userService.saveUser(new User("Николай", "Дольский", 29,
                "Dolsky@gmail.com", "root", adminRole));

        userService.saveUser(new User("Александр", "Куликов", 35,
                "Kulikov@mail.ru", "111111", userRole));

        userService.saveUser(new User("Валентин", "Заводов", 32,
                "Zavodov@mail.ru", "222222", userRole));

        userService.saveUser(new User("Павел", "Воробьёв", 32,
                "Vorobiev@mail.ru", "333333", userRole));

        userService.saveUser(new User("Илья", "Бобылёв", 25,
                "Bobylev@mail.ru", "444444", userRole));
    }
}
