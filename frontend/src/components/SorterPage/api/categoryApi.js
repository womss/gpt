import axios from 'axios';
import { atom } from 'jotai';
import { message } from 'antd';
import {
    categoriesAtom,
    currentCategoryAtom,
    currentCategoryNameAtom,
    newCategoryAtom,
    isEditingCategoryAtom,
    newCategoryNameAtom,
    addCategoryModalVisibleAtom,
    cardsAtom
} from '../atoms/atoms';

import{messageAtom}from'../atoms/messageAtom';
import { fetchElementsByCategoryAction } from './elementApi';


const API_BASE_URL = '/api/categories';

// 카테고리 불러오기
export const fetchCategoriesAction = atom(
    null,
    async (get, set, userId) => {
        try {
            const response = await axios.get(`${API_BASE_URL}?user_id=${userId}`);
            set(categoriesAtom, response.data);
        } catch (error) {
            console.error('카테고리 불러오기 실패', error);
            set(messageAtom, { type: 'warning', content: '카테고리 불러오기 실패' });
        }
    }
);

// 카테고리 추가
export const handleCategoryOkAction = atom(
    null,
    async (get, set) => {
        const newCategory = get(newCategoryAtom); // 새로운 카테고리 이름을 가져옵니다.

        if (!newCategory) {
            set(messageAtom, { type: 'warning', content: '카테고리 이름을 입력하세요.' });
            return;
        }

        try {
            const response = await axios.post(`${API_BASE_URL}/add_category`, {
                user_id: 'user123',
                category_name: newCategory,
            });

            // 새 카테고리 정보를 가져와서 상태 갱신
            const currentCategory = get(currentCategoryAtom);
            fetchCategoryByIdAction(currentCategory); // Fetch current category details

            set(categoriesAtom, (prevCategories) => [
                ...prevCategories,
                { category_id: response.data.category_id, category_name: response.data.category_name },
            ]);
            set(currentCategoryAtom, response.data.category_id);
            set(currentCategoryNameAtom, response.data.category_name);

            set(messageAtom, { type: 'success', content: '카테고리가 추가되었습니다!' });
            set(addCategoryModalVisibleAtom, false); // Modal 닫기
            set(newCategoryAtom, ''); // 새로운 카테고리 이름 초기화
            set(cardsAtom, []); // 카드를 초기화

            // 카테고리에 맞는 요소를 가져옵니다.
            fetchElementsByCategoryAction(response.data.category_id);

        } catch (error) {
            set(messageAtom, { type: 'warning', content: '카테고리 추가 실패!' });
            console.error(error);
        }
    }
);

// 카테고리 삭제
export const deleteCategoryAction = atom(
    null,
    async (get, set) => {
        const currentCategory = get(currentCategoryAtom);
        const currentCategoryName = get(currentCategoryNameAtom);

        if (!currentCategory) {
            set(messageAtom, { type: 'warning', content: '삭제할 카테고리를 선택해주세요.' });
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/api/categories/delete_category', null, {
                params: { category_id: currentCategory },
            });

            set(messageAtom, { type: 'success', content: `"${currentCategoryName}"을(를) 성공적으로 삭제했습니다.` });

            set(categoriesAtom, (prevCategories) => prevCategories.filter((category) => category.category_id !== currentCategory));

            const maxCategoryId = await fetchMaxCategoryIdAction();
            const minCategoryId = await fetchMinCategoryIdAction();

            if (currentCategory === response.data.category_id) {
                if (maxCategoryId > minCategoryId) {
                    set(currentCategoryAtom, minCategoryId);
                    await fetchCategoryByIdAction(minCategoryId);
                } else {
                    set(currentCategoryAtom, 0);
                    set(currentCategoryNameAtom, '');
                    set(cardsAtom, []);
                }
            }

            set(currentCategoryNameAtom, '');
            set(cardsAtom, []);

        } catch (error) {
            set(messageAtom, { type: 'warning', content: '카테고리 삭제 실패!' });
            console.error(error);
        }
    }
);

// 카테고리 이름 변경
export const handleCategoryNameSaveAction = atom(
    null,
    async (get, set) => {
        const newCategoryName = get(newCategoryNameAtom);
        const currentCategory = get(currentCategoryAtom);

        if (!newCategoryName) {
            set(messageAtom, { type: 'warning', content: '카테고리 이름을 입력하세요.' });
            return;
        }

        try {
            await axios.put(`${API_BASE_URL}/update_category_name`, null, {
                params: {
                    category_id: currentCategory,
                    category_name: newCategoryName,
                },
            });

            set(messageAtom, { type: 'success', content: '카테고리 이름이 업데이트되었습니다!' });
            set(currentCategoryNameAtom, newCategoryName);
            set(isEditingCategoryAtom, false);
        } catch (error) {
            set(messageAtom, { type: 'warning', content: '카테고리 이름 업데이트 실패!' });
            console.error(error);
        }
    }
);

// 카테고리 이름 더블클릭 시 수정 모드 활성화
export const handleCategoryNameDoubleClickAction = atom(
    null,
    (get, set) => {
        const currentCategoryName = get(currentCategoryNameAtom);
        set(isEditingCategoryAtom, true);
        set(newCategoryNameAtom, currentCategoryName);
    }
);

// 카테고리 변경 (이전/다음 카테고리)
export const changeCategoryAction = atom(
    null,
    async (get, set, direction) => {
        let currentCategoryId = get(currentCategoryAtom);
        const maxCategoryId = await fetchMaxCategoryIdAction();
        const minCategoryId = await fetchMinCategoryIdAction();

        if (direction === 'next') {
            if (currentCategoryId >= maxCategoryId) {
                set(messageAtom, { type: 'warning', content: '마지막 카테고리입니다!' });
                return;
            }
            currentCategoryId += 1;
        } else if (direction === 'prev') {
            if (currentCategoryId <= minCategoryId) {
                set(messageAtom, { type: 'warning', content: '첫 번째 카테고리입니다!' });
                return;
            }
            currentCategoryId -= 1;
        }

        set(currentCategoryAtom, currentCategoryId);
        await fetchCategoryByIdAction(currentCategoryId, set);
    }
);

// 카테고리 최대 ID 조회 액션
export const fetchMaxCategoryIdAction = atom(
    null,
    async (get, set) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/max_category_id`);
            return response.data;
        } catch (error) {
            console.error('최대 카테고리 ID 조회 실패:', error);
            set(messageAtom, { type: 'warning', content: '최대 카테고리 ID 조회 실패' });
        }
    }
);

// 카테고리 최소 ID 조회 액션
export const fetchMinCategoryIdAction = atom(
    null,
    async (get, set) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/min_category_id`);
            return response.data;
        } catch (error) {
            console.error('최소 카테고리 ID 조회 실패:', error);
            set(messageAtom, { type: 'warning', content: '최소 카테고리 ID 조회 실패' });
        }
    }
);

// 카테고리 ID로 카테고리 조회 액션
export const fetchCategoryByIdAction = atom(
    null,
    async (get, set, categoryId) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/get_category_by_id`, {
                params: {
                    user_id: 'user123',
                    category_id: categoryId,
                },
            });

            if (response.data) {
                const category = response.data;
                set(currentCategoryAtom, category.category_id);
                set(currentCategoryNameAtom, category.category_name);
            }
        } catch (error) {
            console.error('카테고리 조회 실패:', error);
            set(messageAtom, { type: 'warning', content: '카테고리 조회 실패' });
        }
    }
);
