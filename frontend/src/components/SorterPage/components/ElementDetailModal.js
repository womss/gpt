import { useAtom, useSetAtom } from "jotai";
import { Modal, Divider, Input, Button } from "antd";
import { SquarePen, X } from "lucide-react";  // 아이콘 변경
import { useState } from "react";
import { RotateCcw } from "lucide-react"
import {
    elementDetailModalAtom,
    elementDetailDataAtom,
    elementAttributesAtom,
    isEditingAtom,
} from "../atoms/atoms";

import { closeElementDetailAction } from "../actions/elementsDataAction";
import "../css/SorterPage/ElementDetailModal.css";

const ElementDetailModal = () => {
    const [open] = useAtom(elementDetailModalAtom);
    const [data, setData] = useAtom(elementDetailDataAtom);
    const [attributes, setAttributes] = useAtom(elementAttributesAtom);
    const [isEditing, setIsEditing] = useAtom(isEditingAtom);
    const closeElementDetail = useSetAtom(closeElementDetailAction);

    const [editingField, setEditingField] = useState(null);
    const [tempValue, setTempValue] = useState("");

    const handleSaveField = () => {
        if (editingField === "name") {
            setData({ ...data, elements_name: tempValue });
        } else if (editingField === "price") {
            setData({ ...data, elements_price: Number(tempValue) });
        } else if (editingField?.startsWith("key-")) {
            const idx = Number(editingField.split("-")[1]);
            const newAttr = [...attributes];
            newAttr[idx].key_name = tempValue;
            setAttributes(newAttr);
        } else if (editingField?.startsWith("value-")) {
            const idx = Number(editingField.split("-")[1]);
            const newAttr = [...attributes];
            newAttr[idx].value_name = tempValue;
            setAttributes(newAttr);
        }
        setEditingField(null);
    };

    const handleCompleteEdit = () => {
        handleSaveField();
        setIsEditing(false);
    };

    const handleClose = () => {
        setIsEditing(false);
        setEditingField(null);
        closeElementDetail();
    };

    return (
        <Modal
            title={null}
            open={open}
            onCancel={handleClose}
            footer={null}
            centered
            className="detail-modal"
        >
            {data ? (
                <div className="detail-container">

                    {/* 편집 모드 토글 버튼 */}
                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        style={{ background: "none", border: "none", cursor: "pointer" }}
                        className="Element-Detail-Modal-edit-btn"
                    >
                        {isEditing ? <RotateCcw size={20} color="#f5222d" /> : <SquarePen size={20} />}
                    </button>

                    <div className="detail-header-section">
                        <img
                            src={data?.elements_img_url || process.env.PUBLIC_URL + "/default-img.png"}
                            alt="element"
                            className="detail-img"
                        />

                        <div className="detail-header">
                            <div className="detail-top">
                                {editingField === "name" ? (
                                    <Input
                                        style={{ width: "100px" }}
                                        size="small"
                                        value={tempValue}
                                        onChange={(e) => setTempValue(e.target.value)}
                                        onBlur={handleSaveField}
                                        className = "custom-input"
                                        autoFocus
                                    />
                                ) : (
                                    <div
                                        className="detail-title"
                                        onClick={() => {
                                            if (isEditing) {
                                                setEditingField("name");
                                                setTempValue(data.elements_name);
                                            }
                                        }}
                                    >
                                        {data.elements_name}
                                    </div>
                                )}
                            </div>

                            {editingField === "price" ? (
                                <Input
                                    size="small"
                                    style={{ width: "100px" }}
                                    value={tempValue}
                                    onChange={(e) => setTempValue(e.target.value)}
                                    onBlur={handleSaveField}
                                    className = "custom-input"
                                    autoFocus
                                />
                            ) : (
                                <div
                                    className="detail-price"
                                    onClick={() => {
                                        if (isEditing) {
                                            setEditingField("price");
                                            setTempValue(data.elements_price);
                                        }
                                    }}
                                >
                                    {data.elements_price.toLocaleString()}원
                                </div>
                            )}
                        </div>
                    </div>

                    <Divider className="detail-divider" />

                    <div className="detail-attributes">
                        {attributes.length ? (
                            attributes.map((attr, idx) => (
                                <div className="detail-attribute" key={idx}>
                                    {editingField === `key-${idx}` ? (
                                        <Input
                                            size="small"
                                            style={{ width: "100px" }}
                                            value={tempValue}
                                            onChange={(e) => setTempValue(e.target.value)}
                                            onBlur={handleSaveField}
                                            className = "custom-input"
                                            autoFocus
                                        />
                                    ) : (
                                        <div
                                            className="attribute-key"
                                            onClick={() => {
                                                if (isEditing) {
                                                    setEditingField(`key-${idx}`);
                                                    setTempValue(attr.key_name);
                                                }
                                            }}
                                        >
                                            {attr.key_name}
                                        </div>
                                    )}

                                    {editingField === `value-${idx}` ? (
                                        <Input
                                            size="small"
                                            style={{ width: "100px" }}
                                            value={tempValue}
                                            onChange={(e) => setTempValue(e.target.value)}
                                            onBlur={handleSaveField}
                                            className = "custom-input"
                                            autoFocus
                                        />
                                    ) : (
                                        <div
                                            className="attribute-value"
                                            onClick={() => {
                                                if (isEditing) {
                                                    setEditingField(`value-${idx}`);
                                                    setTempValue(attr.value_name);
                                                }
                                            }}
                                        >
                                            {attr.value_name}
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className="detail-empty">속성 없음</div>
                        )}
                    </div>

                    {/* 완료 버튼 (하단) */}
                    {isEditing && (
                        <Button
                            type="default"
                            block
                            className="element-detail-complete-btn"
                            onClick={handleCompleteEdit}
                        >
                            완료
                        </Button>

                    )}
                </div>
            ) : (
                <div className="detail-empty">데이터가 없습니다.</div>
            )}
        </Modal>
    );
};

export default ElementDetailModal;
