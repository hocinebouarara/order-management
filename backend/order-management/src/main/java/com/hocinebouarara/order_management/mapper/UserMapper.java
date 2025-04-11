package com.hocinebouarara.order_management.mapper;

import com.hocinebouarara.order_management.dto.UserDTO;
import com.hocinebouarara.order_management.model.entity.User;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserMapper {

    User userDTOToUser(UserDTO userDTO);

    UserDTO userToUserDTO(User user);

    List<UserDTO> usersToUserDTOs(List<User> users);

}
