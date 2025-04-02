import { atom } from 'jotai';

// 메시지 API 관련 상태

export const messageApiAtom = atom(null);
export const contextHolderAtom = atom(null);

// 모달 관련 상태
export const addCategoryModalVisibleAtom = atom(false);
export const addElementModalVisibleAtom = atom(false);

export const sorterModalVisibleAtom = atom(false);

// 카테고리 관련 상태
export const newCategoryAtom = atom('');
export const categoriesAtom = atom([]);
export const currentCategoryAtom = atom(0);
export const currentCategoryNameAtom = atom('');
export const isEditingCategoryAtom = atom(false);
export const newCategoryNameAtom = atom('');

// 요소 관련 상태
export const currentElementNameAtom = atom('');
export const isEditingElementAtom = atom(false);

export const editingElementIndexAtom = atom(null);
export const elementsDataAtom = atom([{ key_name: "", value_name: "" }]);

// 제품 관련 상태
export const newElementNameAtom = atom('');
export const newElementCostAtom = atom('');
export const newElementKeyAtom = atom('');
export const newElementValueAtom = atom('');

// 카드 관련 상태
export const cardsAtom = atom([]);

// 정렬기 관련 상태
export const updatedSortersAtom = atom({});
export const sorterNameAtom = atom('');
export const isEditingSorterAtom = atom(false);
export const newSorterNameAtom = atom('');
export const sortersAtom = atom([]);
export const editingSorterIndexAtom = atom(null);

// 드래그 관련 상태
export const containerRefAtom = atom(null);
export const isDraggingAtom = atom(false);
export const startXAtom = atom(0);
export const scrollLeftAtom = atom(0);
