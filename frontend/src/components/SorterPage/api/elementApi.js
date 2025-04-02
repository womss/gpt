import axios from 'axios';
import { atom } from 'jotai';
import {
    cardsAtom,
    newElementNameAtom,
    isEditingElementAtom,
    editingElementIndexAtom,
    currentElementNameAtom,
    newProductNameAtom,
    addElementModalVisibleAtom,
    newProductCostAtom
} from '../atoms/elementAtom';  // elementAtom.js에서 임포트된 상태들
import { currentCategoryAtom } from "../atoms/categoryAtom";
import{messageAtom}from'../atoms/messageAtom';

// Elements 가져오기
export const fetchElementsByCategoryAction = atom(
    null,
    async (get, set, categoryId) => {
        try {
            const response = await axios.get('http://localhost:8080/api/elements/get_elements_by_category', {
                params: { category_id: categoryId },
            });
            set(cardsAtom, response.data);
        } catch (error) {
            console.error('카테고리 요소 조회 실패', error);
        }
    }
);

export const addElementAction = atom(
    null,
    (get, set) => {
        const currentCategory = get(currentCategoryAtom); // Get the current selected category

        if (!currentCategory) {
            set(messageAtom, { type: 'warning', content: '카테고리를 먼저 추가하세요.' });
            return;
        }

        // Set the state to show the add element modal
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
export const handleElementDoubleClickAction = atom(
    null,
    (get, set, index) => {
        const cards = get(cardsAtom);
        if (index < 0 || index >= cards.length) {
            console.error("Invalid index:", index);
            return;
        }

        set(editingElementIndexAtom, index);
        set(isEditingElementAtom, true);
        set(newElementNameAtom, cards[index]?.elements_name || '');
        set(currentElementNameAtom, cards[index]?.elements_name || '');
    }
);

// 메시지 상태 관리용 atom


// 상품 추가 성공 메시지
const success = (msg, set) => {
    set(messageAtom, { type: 'success', content: msg });
};

// 상품 추가 경고 메시지
const warning = (msg, set) => {
    set(messageAtom, { type: 'warning', content: msg });
};

const API_BASE_URL = '/api/products';

export const handleElementOkAction = atom(
    null,
    async (get, set) => {
        const newProductName = get(newProductNameAtom);
        const newProductCost = get(newProductCostAtom);
        const cards = get(cardsAtom);
        const currentCategory = get(currentCategoryAtom);
        const card_image = "default_image_url"; // Define your card image URL logic here

        if (!newProductName || !newProductCost) {
            warning('상품 이름과 가격을 입력하세요.', set);
            return;
        }

        const productCost = parseInt(newProductCost, 10);
        if (isNaN(productCost)) {
            warning('가격은 숫자만 입력 가능합니다.', set);
            return;
        }

        const newProduct = {
            category_id: currentCategory,
            elements_name: newProductName,
            elements_price: productCost || 0,
            elements_image: card_image,
        };

        try {
            const response = await axios.post('http://localhost:8080/api/elements/add_element', newProduct);

            success('상품이 추가되었습니다!', set);
            set(cardsAtom, [...cards, newProduct]);
            set(addElementModalVisibleAtom, false);
            set(newProductNameAtom, '');
            set(newProductCostAtom, '');
        } catch (error) {
            warning('상품 추가 실패!', set);
            console.error(error);
        }
    }
);

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

export const setCurrentCategoryAction = atom(
    null,
    (get, set, categoryId) => {
        set(currentCategoryAtom, categoryId);
    }
);
