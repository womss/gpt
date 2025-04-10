package org.sortic.sorticproject.Mapper;

import org.apache.ibatis.annotations.*;
import org.sortic.sorticproject.Entity.Sorter;

import java.util.List;

@Mapper
public interface SorterMapper {

    // 정렬자 추가
    @Insert("INSERT INTO Sorter (user_id, elements_id, sorter_name) " +
            "VALUES (#{user_id}, #{elements_id}, #{sorter_name})")
    void insertSorter(Sorter sorter);

    // 정렬자 조회 (sorter_id로 조회)
    @Select("SELECT * FROM Sorter WHERE sorter_id = #{sorter_id}")
    @Results({
            @Result(property = "sorter_id", column = "sorter_id"),
            @Result(property = "user_id", column = "user_id"),
            @Result(property = "elements_id", column = "elements_id"),
            @Result(property = "sorter_name", column = "sorter_name")
    })
    Sorter getSorterById(int sorter_id);

    // 사용자별 정렬자 목록 조회
    @Select("SELECT * FROM Sorter WHERE user_id = #{user_id}")
    @Results({
            @Result(property = "sorter_id", column = "sorter_id"),
            @Result(property = "user_id", column = "user_id"),
            @Result(property = "elements_id", column = "elements_id"),
            @Result(property = "sorter_name", column = "sorter_name")
    })
    List<Sorter> getSortersByUserId(String user_id);

    // 정렬자 수정
    @Update("UPDATE Sorter SET sorter_name = #{sorter_name}, elements_id = #{elements_id} " +
            "WHERE sorter_id = #{sorter_id}")
    void updateSorter(@Param("sorter_id") int sorter_id, @Param("sorter_name") String sorter_name, @Param("elements_id") int elements_id);

    // 정렬자 삭제
    @Delete("DELETE FROM Sorter WHERE sorter_id = #{sorter_id}")
    void deleteSorter(int sorter_id);
}
