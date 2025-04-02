import axios from 'axios';
import { atom } from 'jotai';
import {
    sortersAtom,
    newSorterNameAtom,
    isEditingSorterAtom,
    editingSorterIndexAtom,
    updatedSortersAtom,
    sorterModalVisibleAtom
} from '../atoms/sorterAtom';

// Action for adding a sorter
export const addSorterAction = atom(null, async (get, set) => {
    const sorters = get(sortersAtom);
    const newSorter = {
        sorter_id: sorters.length + 1,  // For simplicity, the id is the length of the array
        sorter_name: `Sorter ${sorters.length + 1}`,
    };

    try {
        const response = await axios.post('http://localhost:8080/api/sorters/add_sorter', {
            user_id: 'user123',
            elements_id: null,
            sorter_name: newSorter.sorter_name,
        });

        // Assuming response contains the new sorter object
        const createdSorter = response.data;

        // Update the state with the new sorter
        set(sortersAtom, [...sorters, createdSorter]);

        // Optionally, set the new sorter to 'updated' state
        set(updatedSortersAtom, (prevState) => ({
            ...prevState,
            [createdSorter.sorter_name]: true,
        }));

        // Reset the modal and editing states
        set(sorterModalVisibleAtom, false);

    } catch (error) {
        console.error('새 정렬자 추가 실패!', error);
        alert('새 정렬자 추가 실패!');
    }
});

// Action for handling sorter name change
export const handleSorterNameChangeAction = atom(
    (get) => get(newSorterNameAtom),
    (get, set, e) => {
        set(newSorterNameAtom, e.target.value);
    }
);

// Action for starting edit mode on sorter name
export const handleSorterDoubleClickAction = atom(
    null,
    (get, set, index) => {
        const sorters = get(sortersAtom);
        set(editingSorterIndexAtom, index);
        set(newSorterNameAtom, sorters[index].sorter_name);  // Set existing name for editing
        set(isEditingSorterAtom, true);  // Enable editing
    }
);

// Action for saving sorter name after editing
export const handleSorterNameSaveAction = atom(
    null,
    async (get, set) => {
        const newSorterName = get(newSorterNameAtom);
        const editingSorterIndex = get(editingSorterIndexAtom);
        const sorters = get(sortersAtom);
        if (!newSorterName) {
            alert('정렬자 이름을 입력하세요.');  // Use your warning method here
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/api/sorters/update_sorter', {
                sorter_id: sorters[editingSorterIndex].sorter_id,
                sorter_name: newSorterName,
            });

            const updatedSorter = response.data;

            // Update the sorters array with the new name
            set(sortersAtom, (prevSorters) =>
                prevSorters.map((sorter, idx) =>
                    idx === editingSorterIndex ? { ...sorter, sorter_name: updatedSorter.sorter_name } : sorter
                )
            );

            // Optionally, mark the updated sorter
            set(updatedSortersAtom, (prevState) => ({
                ...prevState,
                [updatedSorter.sorter_name]: true,
            }));

            // Reset the editing state
            set(isEditingSorterAtom, false);
            set(editingSorterIndexAtom, null);
            set(newSorterNameAtom, "");

        } catch (error) {
            console.error('정렬자 이름 수정 실패!', error);
            alert('정렬자 이름 수정 실패!');
        }
    }
);

// Action for blurring the input field and saving
export const handleSorterNameBlurAction = atom(
    null,
    (get, set) => {
        set(handleSorterNameSaveAction);
    }
);

// Action for pressing Enter to save the sorter name
export const handleSorterNameKeyPressAction = atom(
    null,
    (get, set, e) => {
        if (e.key === 'Enter') {
            set(handleSorterNameSaveAction);
        }
    }
);
