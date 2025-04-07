import { atom } from 'jotai';

// 메시지 API 관련 상태


export const messageAtom = atom(null);
export const messageApiAtom = atom(null);
export const contextHolderAtom = atom(null);

// 모달 관련 상태
export const addCategoryModalVisibleAtom = atom(false);
export const addElementModalVisibleAtom = atom(false);
export const attributeModalVisibleAtom = atom(false);
export const sorterModalVisibleAtom = atom(false);

// 카테고리 관련 상태
export const newCategoryAtom = atom('');
export const categoriesAtom = atom([]);
export const currentCategoryAtom = atom(0);
export const currentCategoryNameAtom = atom('');
export const isEditingCategoryAtom = atom(false);
export const newCategoryNameAtom = atom('');
export const currentIndexAtom = atom(0);
// 요소 관련 상태
export const currentElementNameAtom = atom('');
export const isEditingElementAtom = atom(false);
export const originalElementNameAtom = atom('');
export const editingElementIndexAtom = atom(null);
export const elementsDataAtom = atom([{ key_name: "", value_name: "" }]);
export const selectedElementIdAtom = atom (0);
export const newElementNameAtom = atom('');
export const selectedElementIdsAtom = atom([]);
export const addElementNameAtom = atom('');
export const addElementCostAtom = atom('');
export const addElementKeyAtom = atom('');
export const addElementValueAtom = atom('');
export const keyValuePairsAtom = atom([]);

export const addedElementIdAtom = atom(null);
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

export const animationClassAtom = atom('');
export const fadeInOutAtom = atom(false);






export const userAtom = atom({
    nickname: 'Guest',
    loggedIn: false,
});

// 로그인 상태 관리
export const isLoggedInAtom = atom(false);  // 기본값은 로그아웃 상태 (false)