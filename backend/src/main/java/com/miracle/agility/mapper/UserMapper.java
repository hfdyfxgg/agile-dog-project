package com.miracle.agility.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.miracle.agility.entity.User;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper extends BaseMapper<User> {
} 