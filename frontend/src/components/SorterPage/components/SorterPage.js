import React, { useEffect } from 'react';
import { useAtom } from 'jotai';
import { Input, Modal, message } from 'antd';
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import "../css/SorterPage/Sorter.css";
import "../css/SorterPage/Card.css";
import "../css/SorterPage/SorterPage.css";
import "../css/SorterPage/Category.css";
import "../css/SorterPage/Element.css";
import 'font-awesome/css/font-awesome.min.css';

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

import {
    fetchCategoriesAction,
    handleCategoryOkAction,
    deleteCategoryAction,
    handleCategoryNameSaveAction,
    handleCategoryNameDoubleClickAction,
    changeCategoryAction,
    fetchFirstCategoryAction
} from '../actions/categoryAction';

import {
    fetchElementsByCategoryAction,
    addElementAction,
    handleElementNameChangeAction,
    handleElementDoubleClickAction,
    handleElementOkAction,
    handleElementNameSaveAction,
    setCurrentCategoryAction
} from '../actions/elementAction';

const SorterPage = () => {
    const [editingElementIndex, setEditingElementIndex] = useAtom(editingElementIndexAtom);
    const [isEditingElement, setIsEditingElement] = useAtom(isEditingElementAtom);
    const [categories, setCategories] = useAtom(categoriesAtom);
    const [currentCategory, setCurrentCategory] = useAtom(currentCategoryAtom);
    const [currentCategoryName, setCurrentCategoryName] = useAtom(currentCategoryNameAtom);
    const [newCategory, setNewCategory] = useAtom(newCategoryAtom);
    const [isEditingCategory, setIsEditingCategory] = useAtom(isEditingCategoryAtom);
    const [newCategoryName, setNewCategoryName] = useAtom(newCategoryNameAtom);
    const [addCategoryModalVisible, setAddCategoryModalVisible] = useAtom(addCategoryModalVisibleAtom);
    const [cards, setCards] = useAtom(cardsAtom);
    const [newElementName, setNewElementName] = useAtom(newElementNameAtom);

    const [fetchCategories] = useAtom(fetchCategoriesAction);
    const [, setHandleCategoryOk] = useAtom(handleCategoryOkAction);
    const [, setDeleteCategory] = useAtom(deleteCategoryAction);
    const [, setHandleCategoryNameSave] = useAtom(handleCategoryNameSaveAction);
    const [, setHandleCategoryNameDoubleClick] = useAtom(handleCategoryNameDoubleClickAction);
    const [, setChangeCategory] = useAtom(changeCategoryAction);
    const [, setFetchFirstCategory] = useAtom(fetchFirstCategoryAction);
    const [, setHandleElementNameSaveAction] = useAtom(handleElementNameSaveAction);

    useEffect(() => {
        firstCategory();
    }, []);

    // 첫 번째 카테고리 조회
    const firstCategory = async () => {
        try {
            await setFetchFirstCategory('user123');
        } catch (error) {
            console.error('첫 번째 카테고리 조회 실패:', error);
            message.error('첫 번째 카테고리 조회에 실패했습니다.');
        }
    };

    // 카테고리 추가
    const handleAddCategory = async () => {
        try {
            await setHandleCategoryOk();
        } catch (error) {
            console.error('카테고리 추가 중 오류 발생:', error);
            message.error('카테고리 추가에 실패했습니다.');
        }
    };

    // 카테고리 변경
    const handleCategoryChange = async (direction) => {
        try {
            await setChangeCategory(direction);
        } catch (error) {
            console.error('카테고리 변경 에러:', error);
            message.error('카테고리 변경에 실패했습니다.');
        }
    };
// 카테고리 이름 변경 저장
    const handleSaveCategoryName = async () => {
        try {
            await setHandleCategoryNameSave(); // 카테고리 이름 저장
        } catch (error) {
            console.error('카테고리 이름 변경 에러:', error);
            message.error('카테고리 수정에 실패했습니다.');
        }
    };
    // 카테고리 삭제
    const handleDeleteCategory = async () => {
        try {
            await setDeleteCategory();
        } catch (error) {
            console.error('카테고리 삭제 에러:', error);
            message.error('카테고리 삭제에 실패했습니다.');
        }
    };

    // 요소 더블 클릭 -> 편집 모드 활성화
    const handleDoubleClickElementName = (index) => {
        setEditingElementIndex(index);
        setIsEditingElement(true);
    };

    // 요소 이름 변경
    const handleElementNameChange = (e) => {
        setNewElementName(e.target.value);
    };

    // 요소 이름 저장
    const handleElementSaveName = async (elementId) => {
        try {
            await setHandleElementNameSaveAction(elementId);
            setIsEditingElement(false);
        } catch (error) {
            console.log("요소 수정 실패");
            message.error("요소 수정 실패");
        }
    };

    return (
        <div className='sorter-section'>
            <div className='sorter-header'>
                <LeftOutlined
                    onClick={() => handleCategoryChange('prev')}
                    style={{ fontSize: '30px' }}
                />
                <button className="category-btn" onClick={() => setAddCategoryModalVisible(true)}>
                    +
                </button>
                <div className="category-name" onDoubleClick={setHandleCategoryNameDoubleClick}>
                    {isEditingCategory ? (
                        <input
                            value={newCategoryName}
                            onChange={(e) => setNewCategoryName(e.target.value)}
                            onBlur={handleSaveCategoryName}
                            onKeyDown={(e) => e.key === "Enter" && handleSaveCategoryName()}
                            autoFocus
                        />
                    ) : (
                        currentCategoryName || '이름 없음'
                    )}
                </div>
                <button className="category-btn" onClick={handleDeleteCategory}>-</button>
                <RightOutlined
                    onClick={() => handleCategoryChange('next')}
                    style={{ fontSize: '30px' }}
                />
            </div>

            <div className="box-section">
                {cards.map((card) => (
                    <div className="category-item" key={card.elements_name_id} onDoubleClick={() => handleDoubleClickElementName(card.elements_name_id)}>
                        {isEditingElement && editingElementIndex === card.elements_name_id ? (
                            <input
                                value={newElementName}
                                onChange={handleElementNameChange}
                                onBlur={() => handleElementSaveName(card.elements_name_id)}
                                onKeyDown={(e) => e.key === "Enter" && handleElementSaveName(card.elements_name_id)}
                                autoFocus
                            />
                        ) : (
                            card.elements_name
                        )}
                    </div>
                ))}
            </div>

            <Modal
                title="카테고리 추가"
                open={addCategoryModalVisible}
                onOk={handleAddCategory}
                onCancel={() => setAddCategoryModalVisible(false)}
            >
                <Input value={newCategory} onChange={(e) => setNewCategory(e.target.value)} />
            </Modal>
        </div>
    );
};

export default SorterPage;
