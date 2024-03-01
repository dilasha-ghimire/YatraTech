package com.dilasha.yatratechbackend.Dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class UserDto {
    private int userId;
    private String email;
    private String fullName;
    private String phoneNumber;
}
