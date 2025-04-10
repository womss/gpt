package org.sortic.sorticproject.Service;

import org.sortic.sorticproject.Entity.Sorter;
import org.sortic.sorticproject.Mapper.SorterMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SorterService {

    @Autowired
    private SorterMapper sorterMapper;

    // 정렬자 추가
    public void addSorter(Sorter sorter) {
        sorterMapper.insertSorter(sorter);
    }

    // 정렬자 조회 (sorter_id로 조회)
    public Sorter getSorterById(int sorter_id) {
        return sorterMapper.getSorterById(sorter_id);
    }

    // 사용자별 정렬자 목록 조회
    public List<Sorter> getSortersByUserId(String user_id) {
        return sorterMapper.getSortersByUserId(user_id);
    }

    // 정렬자 수정
    public void updateSorter(int sorter_id, String sorter_name, int elements_id) {
        sorterMapper.updateSorter(sorter_id, sorter_name, elements_id);
    }

    // 정렬자 삭제
    public void deleteSorter(int sorter_id) {
        sorterMapper.deleteSorter(sorter_id);
    }
}
