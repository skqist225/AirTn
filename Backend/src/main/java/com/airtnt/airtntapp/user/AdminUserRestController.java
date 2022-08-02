package com.airtnt.airtntapp.user;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.airtnt.airtntapp.exception.UserNotFoundException;
import com.airtnt.airtntapp.response.StandardJSONResponse;
import com.airtnt.airtntapp.response.error.BadResponse;
import com.airtnt.airtntapp.response.success.OkResponse;
import com.airtnt.airtntapp.user.dto.UserListDTO;
import com.airtnt.airtntapp.user.dto.UserListResponse;
import com.airtnt.entity.User;

@RestController
@RequestMapping("/api/admin/")
public class AdminUserRestController {
    @Autowired
    private UserService userService;

    @GetMapping("users")
    public ResponseEntity<StandardJSONResponse<UserListResponse>> getAllUsers(@RequestParam("page") int pageNumber,
            @RequestParam(value = "keyword", defaultValue = "", required = false) String keyword) {
        Page<User> userPages = userService.getAllUsers(pageNumber, keyword);

        List<UserListDTO> userListDTOs = new ArrayList<>();
        UserListResponse userListResponse = new UserListResponse();

        for (User user : userPages.getContent()) {
            userListDTOs.add(UserListDTO.build(user));
            // redisTemplate.opsForHash().put("ROOM", room.getId().toString(),
            // RoomListingsDTO.buildRoomListingsDTO(room));
        }

        // if (redisTemplate.opsForHash().get("TOTAL_PAGES", "TOTAL_PAGES") != null) {
        // roomListingsDTOs = redisTemplate.opsForHash().values("ROOM");

        // roomsOwnedByUserResponseEntity.setRooms(roomListingsDTOs);
        // roomsOwnedByUserResponseEntity
        // .setTotalPages((int) redisTemplate.opsForHash().get("TOTAL_PAGES",
        // "TOTAL_PAGES"));
        // roomsOwnedByUserResponseEntity
        // .setTotalRecords((long) redisTemplate.opsForHash().get("TOTAL_ELS",
        // "TOTAL_ELS"));
        // } else {

        // redisTemplate.opsForHash().put("TOTAL_PAGES", "TOTAL_PAGES", (Integer)
        // roomsPage.getTotalPages());
        // redisTemplate.opsForHash().put("TOTAL_ELS", "TOTAL_ELS", (Long)
        // roomsPage.getTotalElements());

        userListResponse.setUsers(userListDTOs);
        userListResponse.setTotalPages(userPages.getTotalPages());
        userListResponse.setTotalElements(userPages.getTotalElements());

        return new OkResponse<UserListResponse>(userListResponse).response();
    }

    @GetMapping("users/{id}")
    public ResponseEntity<StandardJSONResponse<User>> getUser(@PathVariable(value = "id") Integer id) {
        try {
            return new OkResponse<User>(userService.findById(id)).response();
        } catch (UserNotFoundException e) {
            return new BadResponse<User>(e.getMessage()).response();
        }
    }
}
