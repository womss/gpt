import React, { useEffect } from 'react';
import { useAtom } from 'jotai';
import { Input, Modal } from 'antd';
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
} from '../actions/categoryAction';  // 액션들 임포트
import {
    fetchElementsByCategoryAction,
    addElementAction,
    handleElementNameChangeAction,
    handleElementDoubleClickAction,
    handleElementOkAction,
    handleElementNameSaveAction,
    setCurrentCategoryAction
} from '../actions/elementAction';
import { message } from 'antd';  // 예시에서는 antd 사용

const SorterPage = () => {
    const [categories, setCategories] = useAtom(categoriesAtom);
    const [currentCategory, setCurrentCategory] = useAtom(currentCategoryAtom);
    const [currentCategoryName, setCurrentCategoryName] = useAtom(currentCategoryNameAtom);
    const [newCategory, setNewCategory] = useAtom(newCategoryAtom);
    const [isEditingCategory, setIsEditingCategory] = useAtom(isEditingCategoryAtom);
    const [newCategoryName, setNewCategoryName] = useAtom(newCategoryNameAtom);
    const [addCategoryModalVisible, setAddCategoryModalVisible] = useAtom(addCategoryModalVisibleAtom);
    const [cards, setCards] = useAtom(cardsAtom);
    // 해당하는 액션을 fetch하고 싶을 때 사용하는 훅
    const [fetchCategories] = useAtom(fetchCategoriesAction);  // setFetchCategories로 액션 실행
    const [, setHandleCategoryOk] = useAtom(handleCategoryOkAction); // 수정된 부분
    const [, setDeleteCategory] = useAtom(deleteCategoryAction);
    const [, setHandleCategoryNameSave] = useAtom(handleCategoryNameSaveAction);
    const [, setHandleCategoryNameDoubleClick] = useAtom(handleCategoryNameDoubleClickAction);
    const [, setChangeCategory] = useAtom(changeCategoryAction);
    const [, setFetchFirstCategory] = useAtom(fetchFirstCategoryAction);
    /////////////////////////////////////////////////////////////////////////
    const [, setHandleElementDoubleClickAction] = useAtom(handleElementDoubleClickAction);  // 수정
    const [, setHandleElementNameSaveAction] = useAtom(handleElementNameSaveAction);
    // 카테고리 추가 모달 열기
    const categoryModalVisible = addCategoryModalVisible;
    const [newElementName, setNewElementName] = useAtom(newElementNameAtom);
    // 카테고리 추가
    const handleAddCategory = async () => {
        try {
            await setHandleCategoryOk(); // 카테고리 추가 액션이 끝날 때까지 기다림
        } catch (error) {
            console.error('카테고리 추가 중 오류 발생:', error);
            message.error('카테고리 추가에 실패했습니다.');
        }
    };

    const handleCategoryChange = async (direction) => {
        try {
            await setChangeCategory(direction);  // 카테고리 변경 (이전/다음)
        } catch (error) {
            console.error('카테고리 변경 에러:', error);
            message.error('카테고리 변경에 실패했습니다.');
        }
    };

    // 카테고리 삭제
    const handleDeleteCategory = async () => {
        try {
            await setDeleteCategory(); // 카테고리 삭제 액션
        } catch (error) {
            console.error('카테고리 삭제 에러:', error);
            message.error('카테고리 삭제에 실패했습니다.');
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

    // 카테고리 이름 수정 모드 활성화
    const handleDoubleClickCategoryName = () => {
        setHandleCategoryNameDoubleClick();  // 카테고리 이름 수정 모드 활성화
    };

    // 첫 번째 카테고리 조회
    const firstCategory = async () => {
        try {
            await setFetchFirstCategory('user123'); // 첫 번째 카테고리 조회
        } catch (error) {
            console.error('첫 번째 카테고리 조회 실패:', error);
            message.error('첫 번째 카테고리 조회에 실패했습니다.');
        }
    };

    // 요소 더블 클릭으로 이름 수정 모드 활성화
    const handleDoubleClickElementName = (index) => {
        // index를 setHandleElementDoubleClickAction에 전달하여 편집 상태로 전환
        setHandleElementDoubleClickAction(index);  // 수정된 부분
    };

    const handleElementNameChange = (e) => {
        setNewElementName(e.target.value);  // 입력된 값을 상태에 저장
    };

    const handleElementSaveName = async () => {
        try {
            await setHandleElementNameSaveAction();  // 수정된 요소 이름 저장

        } catch (error) {
            console.log("요소 수정 실패");
            message.error("요소 수정 실패");
        }
    };

    useEffect(() => {
        // 첫 번째 카테고리 조회
        firstCategory('user123'); // 실제 사용자 ID로 변경
    }, []);

    return (
        <div className='sorter-section'>
            <div className='sorter-header'>
                <LeftOutlined
                    onClick={() => handleCategoryChange('prev')}
                    style={{ fontSize: '30px' }} // Increase the size of the left arrow
                />
                <button type="text" className="category-btn" onClick={() => setAddCategoryModalVisible(true)}>
                    +
                </button>
                <div className="category-name" onDoubleClick={handleDoubleClickCategoryName}>
                    {isEditingCategory ? (
                        <input
                            value={newCategoryName}
                            onChange={(e) => setNewCategoryName(e.target.value)}
                            onBlur={handleSaveCategoryName}
                            onPressEnter={handleSaveCategoryName}
                            autoFocus
                        />
                    ) : (
                        currentCategoryName || '이름 없음'
                    )}
                </div>
                <button type="text" className="category-btn" onClick={handleDeleteCategory}>-</button>
                <RightOutlined
                    onClick={() => handleCategoryChange('next')}
                    style={{ fontSize: '30px' }}
                />
            </div>

            <div className="box-section">
                <div className="category-box">
                    {cards.map((card, index) => (
                        <div className="category-item" key={index} onDoubleClick={() => handleDoubleClickElementName(index)}>
                            <div className="category-item-info">
                                {isEditingElementAtom && editingElementIndexAtom === index ? (
                                    <input
                                        value={newElementNameAtom}
                                        onChange={handleElementNameChange}
                                        onBlur={() => handleElementSaveName(index)}
                                        onPressEnter={() => handleElementSaveName(index)}
                                        autoFocus
                                    />
                                ) : (
                                    card.elements_name
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                <button type="text" className="category-btn-box" onClick={handleAddCategory}>+</button>
            </div>

            <Modal
                title="카테고리 추가"
                open={categoryModalVisible} // 상태 값을 사용
                onOk={handleAddCategory}
                onCancel={() => setAddCategoryModalVisible(false)} // 모달 닫기
            >
                <Input
                    placeholder="새 카테고리 이름"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                />
            </Modal>
        </div>
    );
};

export default SorterPage;
