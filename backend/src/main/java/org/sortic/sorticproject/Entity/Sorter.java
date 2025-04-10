package org.sortic.sorticproject.Entity;


public class Sorter {
    private int sorter_id;       // 정렬자 ID
    private String user_id;      // 아이디 (외래키)
    private int elements_id;     // 요소 ID (외래키)
    private String sorter_name;  // 정렬자 이름

    // 기본 생성자
    public Sorter() {}

    // Getter와 Setter 메서드
    public int getSorter_id() {
        return sorter_id;
    }

    public void setSorter_id(int sorter_id) {
        this.sorter_id = sorter_id;
    }

    public String getUser_id() {
        return user_id;
    }

    public void setUser_id(String user_id) {
        this.user_id = user_id;
    }

    public int getElements_id() {
        return elements_id;
    }

    public void setElements_id(int elements_id) {
        this.elements_id = elements_id;
    }

    public String getSorter_name() {
        return sorter_name;
    }

    public void setSorter_name(String sorter_name) {
        this.sorter_name = sorter_name;
    }
}
