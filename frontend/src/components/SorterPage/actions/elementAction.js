import axios from 'axios';
import { atom } from 'jotai';

import { messageAtom } from '../atoms/messageAtom';
import {
    messageApiAtom,
    contextHolderAtom,
    addCategoryModalVisibleAtom,
    addElementModalVisibleAtom,
    sorterModalVisibleAtom,
    newCategoryAtom,
    categoriesAtom,
    currentCategoryAtom,
    currentCategoryNameAtom,
    isEditingCategoryAtom,
    newCategoryNameAtom,
    currentElementNameAtom,
    isEditingElementAtom,
    editingElementIndexAtom,
    elementsDataAtom,
    newElementNameAtom,
    newElementCostAtom,
    newElementKeyAtom,
    newElementValueAtom,
    cardsAtom,
    updatedSortersAtom,
    sorterNameAtom,
    isEditingSorterAtom,
    newSorterNameAtom,
    sortersAtom,
    editingSorterIndexAtom,
    containerRefAtom,
    isDraggingAtom,
    startXAtom,
    scrollLeftAtom
} from '../atoms/atoms';

// Elements 가져오기
export const fetchElementsByCategoryAction = atom(
    null,
    async (get, set, categoryId) => {
        try {
            const response = await axios.get('http://localhost:8080/api/elements/get_elements_by_category', {
                params: { category_id: categoryId },
            });

            if (Array.isArray(response.data)) {
                set(cardsAtom, response.data);
            } else {
                console.error('잘못된 데이터 형식:', response.data);
                set(messageAtom, { type: 'error', content: '카테고리 요소 조회에 실패했습니다.' });
            }
        } catch (error) {
            console.error('카테고리 요소 조회 실패', error);
            set(messageAtom, { type: 'error', content: '카테고리 요소 조회에 실패했습니다.' });
        }
    }
);

export const addElementAction = atom(
    null,
    (get, set) => {
        const currentCategory = get(currentCategoryAtom); // 현재 선택된 카테고리 가져오기

        if (!currentCategory) {
            set(messageAtom, { type: 'warning', content: '카테고리를 먼저 추가하세요.' });
            return;
        }

        // 요소 추가 모달 열기
        set(addElementModalVisibleAtom, true);
    }
);

// 요소 이름 변경 핸들러
export const handleElementNameChangeAction = atom(
    (get) => get(newElementNameAtom),
    (get, set, e) => {
        set(newElementNameAtom, e.target.value);
    }
);

// 요소 더블 클릭으로 편집 모드 시작

// 요소 더블 클릭으로 편집 모드 시작
export const handleElementDoubleClickAction = atom(
    null,
    (get, set, index) => {
        const cards = get(cardsAtom); // cards 상태 가져오기

        // 인덱스가 범위 내에 있는지 확인
        if (index < 0 || index >= cards.length) {
            console.error("Invalid index:", index);
            return;
        }

        // 요소 편집 상태 설정
        set(editingElementIndexAtom, index); // 편집 중인 요소의 인덱스 설정
        set(isEditingElementAtom, true); // 편집 모드 활성화

        set(newElementNameAtom, cards[index]?.elements_name || ''); // 해당 요소의 이름 설정
        set(currentElementNameAtom, cards[index]?.elements_name || ''); // 현재 요소 이름을 백업
    }
);




// 상품 추가 성공 메시지
const success = (msg, set) => {
    set(messageAtom, { type: 'success', content: msg });
};

// 상품 추가 경고 메시지
const warning = (msg, set) => {
    set(messageAtom, { type: 'warning', content: msg });
};

// 상품 추가 액션
const API_BASE_URL = '/api/products';

export const handleElementOkAction = atom(
    null,
    async (get, set) => {
        const newElementName = get(newElementNameAtom);
        const newElementCost = get(newElementCostAtom);
        const cards = get(cardsAtom);
        const currentCategory = get(currentCategoryAtom);
        const card_image = "default_image_url"; // 이미지 URL 하드코딩 (필요시 수정)

        if (!newElementName || !newElementCost) {
            warning('상품 이름과 가격을 입력하세요.', set);
            return;
        }

        const productCost = parseInt(newElementCost, 10);
        if (isNaN(productCost)) {
            warning('가격은 숫자만 입력 가능합니다.', set);
            return;
        }

        const newElement = {
            category_id: currentCategory,
            elements_name: newElementName,
            elements_price: productCost || 0,
            elements_image: card_image,
        };

        try {
            const response = await axios.post('http://localhost:8080/api/elements/add_element', newElement);

            success('상품이 추가되었습니다!', set);
            set(cardsAtom, [...cards, newElement]);
            set(addElementModalVisibleAtom, false);
            set(newElementNameAtom, '');
            set(newElementCostAtom, '');
        } catch (error) {
            warning('상품 추가 실패!', set);
            console.error(error);
        }
    }
);

// 요소 이름 저장 액션
export const handleElementNameSaveAction = atom(
    null,
    async (get, set) => {
        const newElementName = get(newElementNameAtom);
        const editingElementIndex = get(editingElementIndexAtom);
        const cards = get(cardsAtom);
        const currentCategory = get(currentCategoryAtom);

        if (!newElementName) {
            console.warn('상품 이름을 입력하세요.');
            return;
        }

        try {
            await axios.put('http://localhost:8080/api/elements/update_element', null, {
                params: {
                    category_id: currentCategory,
                    elements_name: newElementName,
                },
            });

            set(cardsAtom, (prevCards) => {
                const updatedCards = [...prevCards];
                updatedCards[editingElementIndex] = {
                    ...updatedCards[editingElementIndex],
                    elements_name: newElementName,
                };
                return updatedCards;
            });

            set(currentElementNameAtom, newElementName);
            set(isEditingElementAtom, false);
            set(newElementNameAtom, '');
        } catch (error) {
            console.warn('상품 이름 수정 실패!');
            console.error(error);
        }
    }
);

// 현재 카테고리 설정 액션
export const setCurrentCategoryAction = atom(
    null,
    (get, set, categoryId) => {
        set(currentCategoryAtom, categoryId);
    }
);
