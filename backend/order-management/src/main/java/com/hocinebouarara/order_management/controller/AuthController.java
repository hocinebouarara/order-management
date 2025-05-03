package com.hocinebouarara.order_management.controller;


import com.hocinebouarara.order_management.dto.LoginRequest;
import com.hocinebouarara.order_management.dto.LoginResponse;
import com.hocinebouarara.order_management.dto.RegisterUserRequest;
import com.hocinebouarara.order_management.dto.UserDTO;
import com.hocinebouarara.order_management.security.JwtService;
import com.hocinebouarara.order_management.service.AuthService;
import com.hocinebouarara.order_management.service.RoleService;
import com.hocinebouarara.order_management.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final UserService userService;
    private final RoleService roleService;
    private final JwtService jwtService;

    /**
     * Registers a new user with the specified roles.
     *
     * @param request the request containing user registration data
     * @return the created user
     */
    @PostMapping("/register")
    public ResponseEntity<LoginResponse> registerUser(@RequestBody @Valid RegisterUserRequest request) {
        LoginResponse registeredUser = authService.registerUser(request);

//        // استرجاع أسماء الأدوار بناءً على roleIds
//        List<String> roleNames = roleService.getRoleNamesByIds(registeredUser.getRoleIds());


//        TokenUserDTO userDTO = new TokenUserDTO(
//                registeredUser.getUsername(),
//                registeredUser.getEmail(),
//                roleNames
//        );
//        String token = jwtService.generateToken(userDTO);
        return ResponseEntity.ok(registeredUser);
    }




    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody @Valid LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    // Get User Details Endpoint (using token)
    @GetMapping("/me")
    public ResponseEntity<UserDTO> getUserDetails(Authentication authentication) {
        String email = authentication.getName(); // تم استخراجه تلقائيًا من JWT
        UserDTO user = userService.getUserByEmail(email);
        return ResponseEntity.ok(user);
    }


}
