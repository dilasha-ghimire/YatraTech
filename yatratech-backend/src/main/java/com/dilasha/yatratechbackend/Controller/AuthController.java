package com.dilasha.yatratechbackend.Controller;

import com.dilasha.yatratechbackend.Dto.LoginDto;
import com.dilasha.yatratechbackend.Dto.LoginResponseDto;
import com.dilasha.yatratechbackend.Dto.RegisterDto;
import com.dilasha.yatratechbackend.Dto.UserDto;
import com.dilasha.yatratechbackend.Entity.Role;
import com.dilasha.yatratechbackend.Entity.User;
import com.dilasha.yatratechbackend.Repository.UserRepository;
import com.dilasha.yatratechbackend.Service.UserService;
import com.dilasha.yatratechbackend.security.JWTGenerator;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private AuthenticationManager authenticationManager;
    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;
    private JWTGenerator jwtGenerator;

    @Autowired
    private UserService userService;

    @Autowired
    public AuthController(AuthenticationManager authenticationManager, UserRepository userRepository,
                          PasswordEncoder passwordEncoder, JWTGenerator jwtGenerator) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtGenerator = jwtGenerator;
    }

    @PostMapping("login")
    public ResponseEntity<LoginResponseDto> login(@RequestBody LoginDto loginDto){
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                loginDto.getEmail(),
                loginDto.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtGenerator.generateToken(authentication);
        return new ResponseEntity<>(new LoginResponseDto(token), HttpStatus.OK);
    }

//    @PostMapping("admin-login")
//    public ResponseEntity<LoginResponseDto> adminLogin(@RequestBody LoginDto loginDto){
//        Authentication authentication = authenticationManager.authenticate(
//                new UsernamePasswordAuthenticationToken(
//                loginDto.getEmail(),
//                loginDto.getPassword()));
//        SecurityContextHolder.getContext().setAuthentication(authentication);
//        String token = jwtGenerator.generateToken(authentication);
//        return new ResponseEntity<>(new LoginResponseDto(token), HttpStatus.OK);
//    }

    @PostMapping("register")
    public ResponseEntity<String> register(@RequestBody RegisterDto registerDto) {
//        if (userRepository.existsByEmail(registerDto.getEmail())) {
//            return new ResponseEntity<>("Email is taken!", HttpStatus.BAD_REQUEST);
//        }
//
//        User user = new User();
//        user.setFullName(registerDto.getFullName());
//        user.setEmail(registerDto.getEmail());
//        user.setPhoneNumber(registerDto.getPhoneNumber());
//        user.setRole(Role.USER);
//        user.setPassword(passwordEncoder.encode((registerDto.getPassword())));
//        userRepository.save(user);
//
//        return new ResponseEntity<>("User registered success!", HttpStatus.OK);
        String message = userService.userRegistration(registerDto);
        if(Objects.equals(message, "Email is taken!")){
            return new ResponseEntity<>("Email is taken!", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>("User registered success!", HttpStatus.OK);
    }

    @PostMapping("update-user")
    public ResponseEntity<String> updateUser(@RequestBody RegisterDto registerDto) {
        String message = userService.updateUser(registerDto);
        if(Objects.equals(message, "Could not find the user")){
            return new ResponseEntity<>("Could not find the user", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>("User updated success!", HttpStatus.OK);
    }

//    @GetMapping("email")
//    public String getEmail(HttpServletRequest request){
//        String token = request.getHeader("Authorization");
//        String userEmail = null;
//        if (StringUtils.hasText(token) && token.startsWith("Bearer ")) {
//            String jwtToken = token.substring(7);
//            userEmail = jwtGenerator.getEmailFromJWT(jwtToken);
//        }
//        return userService.getEmail(userEmail);
//    }

    //send email here and it should receive the id
    @GetMapping("getId/{email}")
    public int getId(@PathVariable String email){
        try {
            return userService.getIdFromEmail(email);
        }
        catch (Exception e){
            System.out.println(e.getMessage());
            return 0;
        }
    }

    @GetMapping("users/{userId}")
    public ResponseEntity<UserDto> getUserById(@PathVariable int userId) {
        UserDto userDto = userService.getUserById(userId);
        if (userDto != null) {
            return ResponseEntity.ok(userDto);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    //get all users
    @GetMapping("get-all-users")
    public List<UserDto> getAllUsers(){
        return userService.getAllUsers();
    }

    //delete user by Id
    @PostMapping("/delete-users/{userId}")
    public void deleteUsers(@PathVariable int userId) {
       userRepository.deleteById(userId);
    }

    @GetMapping("/total-users-records")
    public ResponseEntity<Object> getTotalUsersRecords() {
        List<UserDto> users = userService.getAllUsers();
        int totalRecords = users.size();
        Map<String, Object> response = new HashMap<>();
        response.put("totalRecords", totalRecords);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/get-role/{email}")
    public String getRole(@PathVariable String email){
        return userService.getRole(email);
    }
}
