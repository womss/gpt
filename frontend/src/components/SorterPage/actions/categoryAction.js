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
import { fetchElementsByCategoryAction } from './elementAction';




// 카테고리 추가
export const fetchCategoriesAction = atom(
    null,
    async (get, set, userId) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/categories`);
            set(categoriesAtom, response.data);
        } catch (error) {
            console.error('카테고리 불러오기 실패', error);
            set(messageAtom, { type: 'warning', content: '카테고리 불러오기 실패' });
        }
    }
);

export const fetchCategoryByIdAction = atom(
    null,
    async (get, set, categoryId) => {
        const userId = 'user123';  // 예시로 'user123'을 사용했지만, 실제 값은 get() 등을 통해 가져올 수 있습니다.

        try {
            // API 호출 (user_id와 category_id를 params로 전달)
            const response = await axios.get('http://localhost:8080/api/categories/get_category_by_id', {
                params: {
                    user_id: userId,
                    category_id: categoryId,
                },
            });

            console.log("API 응답 데이터:", response.data);  // 디버깅용 콘솔 로그

            if (response.data) {
                const category = response.data;

                // 카테고리 목록 상태에서 해당 category_id를 찾아 업데이트
                set(categoriesAtom, (prevCategories) => {
                    // 중복 카테고리 처리 (기존 카테고리와 ID가 동일하면 업데이트)
                    const existingCategories = prevCategories.map((cat) => cat.category_id);
                    if (!existingCategories.includes(category.category_id)) {
                        return [...prevCategories, category];  // 중복되지 않으면 추가
                    } else {
                        return prevCategories.map((cat) =>
                            cat.category_id === category.category_id ? { ...cat, ...category } : cat
                        );  // 중복되면 해당 카테고리만 갱신
                    }
                });

                // 카테고리 ID와 이름을 상태에 저장
                set(currentCategoryAtom, category.category_id);
                set(currentCategoryNameAtom, category.category_name);

            } else {
                console.error("카테고리 데이터가 없습니다.");
            }
        } catch (error) {
            console.error('카테고리 상세 정보 로드 실패:', error);
        }
    }
);

export const fetchFirstCategoryAction = atom(
    null,
    async (get, set, userId) => {
        try {
            const response = await axios.get('http://localhost:8080/api/categories/get_first_category', {
                params: { user_id: userId }
            });

            if (response.data) {
                const firstCategory = response.data;

                // 첫 번째 카테고리 상태 업데이트
                set(currentCategoryAtom, firstCategory.category_id);
                set(currentCategoryNameAtom, firstCategory.category_name);

                // 카테고리 목록에 첫 번째 카테고리 추가 (중복되지 않게 처리)
                set(categoriesAtom, (prevCategories) => {
                    // 중복 체크 후 카테고리 추가
                    const categoryExists = prevCategories.some(
                        (category) => category.category_id === firstCategory.category_id
                    );
                    if (!categoryExists) {
                        return [...prevCategories, firstCategory];
                    }
                    return prevCategories;
                });

                // 해당 카테고리의 요소를 불러오기
                set(fetchElementsByCategoryAction, firstCategory.category_id); // 요소 불러오기 액션 호출

            } else {
                console.error('첫 번째 카테고리를 찾을 수 없습니다.');
                set(messageAtom, { type: 'warning', content: '첫 번째 카테고리를 찾을 수 없습니다.' });
            }
        } catch (error) {
            console.error('첫 번째 카테고리 조회 실패:', error);
            set(messageAtom, { type: 'warning', content: '첫 번째 카테고리 조회 실패' });
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
            const response = await axios.post(`http://localhost:8080/api/categories/add_category`, {
                user_id: 'user123',
                category_name: newCategory,
            });

            // 새 카테고리 정보를 가져와서 상태 갱신
            const currentCategory = get(currentCategoryAtom);

            // `fetchCategoryByIdAction`을 atom으로 사용할 때, 직접적으로 호출하지 않고 `set`을 통해 상태를 갱신
            set(fetchCategoryByIdAction, currentCategory);

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
            await axios.put(`http://localhost:8080/api/categories/update_category_name`, null, {
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
            const response = await axios.get(`http://localhost:8080/api/categories/max_category_id`);
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
            const response = await axios.get(`http://localhost:8080/api/categories/min_category_id`);
            return response.data;
        } catch (error) {
            console.error('최소 카테고리 ID 조회 실패:', error);
            set(messageAtom, { type: 'warning', content: '최소 카테고리 ID 조회 실패' });
        }
    }
);



