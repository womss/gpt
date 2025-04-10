package org.sortic.sorticproject.Entity;

import java.util.List;
import java.util.Map;

public class ElementsDataRequest {
    private int elements_name_id;
    private List<Map<String, String>> data;

    public int getElements_name_id() {
        return elements_name_id;
    }

    public void setElements_name_id(int elements_name_id) {
        this.elements_name_id = elements_name_id;
    }

    public List<Map<String, String>> getData() {
        return data;
    }

    public void setData(List<Map<String, String>> data) {
        this.data = data;
    }
}
