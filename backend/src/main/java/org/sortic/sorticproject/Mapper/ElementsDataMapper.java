package org.sortic.sorticproject.Mapper;

import org.apache.ibatis.annotations.*;

import java.util.List;
import java.util.Map;

@Mapper
public interface ElementsDataMapper {

    // ✅ 요소 데이터 추가
    @Insert("INSERT INTO elements_data (elements_name_id, `key_name`, `value_name`) " +
            "VALUES (#{elementId}, #{key}, #{value})")
    void insertElementData(@Param("elementId") int elementId, @Param("key") String key, @Param("value") String value);

    // ✅ 데이터 조회
    @Select("SELECT * FROM elements_data WHERE elements_name_id = #{elements_name_id}")
    List<Map<String, Object>> getElementsDataByElementNameId(int elements_name_id);

    // ✅ 요소 단일 삭제
    @Delete("DELETE FROM elements_data WHERE elements_id = #{elements_id}")
    void deleteElementsData(int elements_id);

    // ✅ 전체 삭제
    @Delete("DELETE FROM elements_data WHERE elements_name_id = #{elements_name_id}")
    void deleteAllElementsData(int elements_name_id);
    // ✅ key_name 수정
    @Update("UPDATE elements_data SET key_name = #{key_name} WHERE elements_id = #{elements_id}")
    void updateKeyName(@Param("elements_id") int elements_id, @Param("key_name") String key_name);

    // ✅ value_name 수정
    @Update("UPDATE elements_data SET value_name = #{value_name} WHERE elements_id = #{elements_id}")
    void updateValueName(@Param("elements_id") int elements_id, @Param("value_name") String value_name);


}
