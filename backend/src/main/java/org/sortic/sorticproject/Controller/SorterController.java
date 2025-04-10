package org.sortic.sorticproject.Controller;

import org.sortic.sorticproject.Entity.Sorter;
import org.sortic.sorticproject.Service.SorterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sorters")
public class SorterController {

    @Autowired
    private SorterService sorterService;

    // 정렬자 추가
    @PostMapping("/add_sorter")
    public String addSorter(@RequestBody Sorter sorter) {
        sorterService.addSorter(sorter);
        return "정렬자가 성공적으로 추가되었습니다!";
    }

    // 정렬자 조회
    @GetMapping("/get_sorter")
    public Sorter getSorter(@RequestParam int sorter_id) {
        return sorterService.getSorterById(sorter_id);
    }

    // 사용자별 정렬자 목록 조회
    @GetMapping("/get_sorters_by_user")
    public List<Sorter> getSortersByUser(@RequestParam String user_id) {
        return sorterService.getSortersByUserId(user_id);
    }

    // 정렬자 수정
    @PutMapping("/update_sorter")
    public String updateSorter(@RequestParam int sorter_id, @RequestParam String sorter_name, @RequestParam int elements_id) {
        sorterService.updateSorter(sorter_id, sorter_name, elements_id);
        return "정렬자가 성공적으로 수정되었습니다!";
    }

    // 정렬자 삭제
    @DeleteMapping("/delete_sorter")
    public String deleteSorter(@RequestParam int sorter_id) {
        sorterService.deleteSorter(sorter_id);
        return "정렬자가 성공적으로 삭제되었습니다!";
    }
}
