package org.sortic.sorticproject.Service;

import org.sortic.sorticproject.Mapper.ElementsDataMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class ElementsDataService {

    @Autowired
    private ElementsDataMapper elementsDataMapper;

    public void addElementData(int id, String key, String value) {
        elementsDataMapper.insertElementData(id, key, value);
    }

    public List<Map<String, Object>> getElementsDataByElementNameId(int elements_name_id) {
        return elementsDataMapper.getElementsDataByElementNameId(elements_name_id);
    }

    public void deleteElementsData(int elements_id) {
        elementsDataMapper.deleteElementsData(elements_id);
    }

    public void deleteAllElementsData(int elements_name_id) {
        elementsDataMapper.deleteAllElementsData(elements_name_id);
    }
}
