import React, { useState } from "react";
import { useAtom } from 'jotai';
import "../css/SorterPage/SorterPageDefault.css";
import { useNavigate } from 'react-router-dom';
import { message, Modal, Input } from 'antd';

import { addCategoryModalVisibleAtom, currentCategoryAtom,newCategoryAtom } from '../atoms/atoms';

import {
    fetchCategoriesAction,
    handleCategoryOkAction,
    fetchAndNumberCategoriesAction,
    fetchCategoryByIdAction,

} from '../actions/categoryAction';

import {
    fetchElementsByCategoryAction
} from '../actions/elementAction';

const SorterPageDefault = () => {
    const [addCategoryModalVisible, setAddCategoryModalVisible] = useAtom(addCategoryModalVisibleAtom);
    const [, setHandleCategoryOk] = useAtom(handleCategoryOkAction);
    const [, setfetchAndNumberCategories] = useAtom(fetchAndNumberCategoriesAction);
    const [,setFetchCategories] = useAtom(fetchCategoriesAction);
    const [, setFetchElementsByCategory] = useAtom(fetchElementsByCategoryAction);
    const [, setFetchCategoryById] = useAtom(fetchCategoryByIdAction);
    const [, setCurrentCategory] = useAtom(currentCategoryAtom);

    const [newCategory, setNewCategory] = useAtom(newCategoryAtom);
    const navigate = useNavigate();

    const handleClick = () => {
        setAddCategoryModalVisible(true); // 모달만 먼저 띄움
    };

    const handleAddCategory = async () => {
        try {
            if (!newCategory.trim()) {
                message.warning("카테고리 이름을 입력해주세요.");
                return;
            }

            await setHandleCategoryOk(newCategory); // 새 카테고리 이름 전달
            await setfetchAndNumberCategories();

            const updatedCategories = await setFetchCategories('user123');


            const newCat = updatedCategories[updatedCategories.length - 1];
            if (!newCat?.category_id) return;

            setCurrentCategory(newCat.category_id);
            await setFetchElementsByCategory(newCat.category_id);
            await setFetchCategoryById(newCat.category_id);

            message.success("카테고리가 추가되었습니다!");
            setAddCategoryModalVisible(false);  // 모달 닫기
            // 입력 초기화
            navigate('/sorter');
        } catch (error) {
            console.error('🚨 카테고리 추가 중 오류 발생:', error);
            message.error('카테고리 추가에 실패했습니다.');
        }
    };

    return (
        <>
            <div className="sorter-section-default" onClick={handleClick}>
                Create Category
            </div>

            <Modal
                title="카테고리 추가"
                open={addCategoryModalVisible}
                onOk={handleAddCategory}
                onCancel={() => {
                    setAddCategoryModalVisible(false);
                    setNewCategory('');
                }}
            >
                <Input
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="카테고리 이름을 입력하세요"
                />
            </Modal>
        </>
    );
};

export default SorterPageDefault;
