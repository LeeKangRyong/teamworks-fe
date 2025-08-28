import { useState, useRef, useEffect } from "react";

export function TextEditor() {
    const [content, setContent] = useState("");
    const [showPreview, setShowPreview] = useState(false);
    const [showEmojiModal, setShowEmojiModal] = useState(false);
    const editorRef = useRef(null);
    const fileInputRef = useRef(null);
    const emojiButtonRef = useRef(null);
    const emojiModalRef = useRef(null);

    const emojis = [
        '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇',
        '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚',
        '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🤩',
        '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '😣', '😖',
        '😫', '😩', '🥺', '😢', '😭', '😤', '😠', '😡', '🤬', '🤯',
        '👍', '👎', '👌', '🤏', '✌', '🤞', '🤟', '🤘', '🤙', '👈',
        '👉', '👆', '🖕', '👇', '☝', '👋', '🤚', '🖐', '✋', '🖖',
        '❤', '🧡', '💛', '💚', '💙', '💜', '🤎', '🖤', '🤍', '💯',
        '💥', '💫', '💦', '💨', '🕳', '💬', '👁‍🗨', '🗨', '🗯', '💭',
        '🔥', '⭐', '🌟', '✨', '⚡', '☄', '💥', '🔴', '🟠', '🟡'
    ];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showEmojiModal && 
                emojiModalRef.current && 
                !emojiModalRef.current.contains(event.target) &&
                emojiButtonRef.current && 
                !emojiButtonRef.current.contains(event.target)) {
                setShowEmojiModal(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showEmojiModal]);

    const insertTextAtCursor = (text) => {
        const editor = editorRef.current;
        if (!editor) return;
        
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            range.deleteContents();
            
            if (text.includes('<img') || text.includes('<')) {
                const fragment = range.createContextualFragment(text);
                range.insertNode(fragment);
            } else {
                const textNode = document.createTextNode(text);
                range.insertNode(textNode);
            }
            
            range.collapse(false);
            selection.removeAllRanges();
            selection.addRange(range);
        } else {
            if (text.includes('<img') || text.includes('<')) {
                editor.innerHTML += text;
            } else {
                editor.appendChild(document.createTextNode(text));
            }
        }
        
        setContent(editor.innerHTML);
        editor.focus();
    };

    const handleEditorChange = () => {
        const editor = editorRef.current;
        if (editor) {
            setContent(editor.innerHTML);
        }
    };

    const handleAttachFile = () => {
        fileInputRef.current?.click();
    };

    // 파일 업로드
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const fileContent = event.target.result;
                
                const fileUrl = URL.createObjectURL(file);
                const fileSize = (file.size / 1024).toFixed(1) + ' KB';
                const fileElement = `
                    <div style="
                        display: inline-flex; 
                        align-items: center; 
                        padding: 8px 12px; 
                        margin: 5px 0;
                        background-color: #f4f4f4; 
                        border: 1px solid #ddd; 
                        border-radius: 6px; 
                        cursor: pointer;
                        transition: background-color 0.2s;
                    " 
                    onclick="window.open('${fileUrl}', '_blank')"
                    onmouseover="this.style.backgroundColor='#e8e8e8'"
                    onmouseout="this.style.backgroundColor='#f4f4f4'">
                        <span style="margin-right: 8px;">📎</span>
                        <div style="display: flex; flex-direction: column;">
                            <span style="font-weight: 500; color: #333; font-size: 14px;">${file.name}</span>
                            <span style="color: #666; font-size: 12px;">${fileSize}</span>
                        </div>
                    </div>
                `;
                
                if (file.type.startsWith('text/')) {
                    insertTextAtCursor(fileElement + `<details style="margin: 10px 0;"><summary style="cursor: pointer; color: #666;">파일 내용 보기</summary><pre style="background-color: #f9f9f9; padding: 10px; margin: 5px 0; border-radius: 4px; white-space: pre-wrap;">${fileContent}</pre></details>`);
                } else {
                    insertTextAtCursor(fileElement);
                }
            };
            reader.onerror = () => {
                insertTextAtCursor(`<span style="color: red;">[파일: ${file.name} - 읽기 실패]</span>`);
            };
            
            if (file.type.startsWith('text/')) {
                reader.readAsText(file);
            } else {
                const fileUrl = URL.createObjectURL(file);
                const fileSize = (file.size / 1024).toFixed(1) + ' KB';
                const fileElement = `
                    <div style="
                        display: inline-flex; 
                        align-items: center; 
                        padding: 8px 12px; 
                        margin: 5px 0;
                        background-color: #f4f4f4; 
                        border: 1px solid #ddd; 
                        border-radius: 6px; 
                        cursor: pointer;
                        transition: background-color 0.2s;
                    " 
                    onclick="window.open('${fileUrl}', '_blank')"
                    onmouseover="this.style.backgroundColor='#e8e8e8'"
                    onmouseout="this.style.backgroundColor='#f4f4f4'">
                        <span style="margin-right: 8px;">📎</span>
                        <div style="display: flex; flex-direction: column;">
                            <span style="font-weight: 500; color: #333; font-size: 14px;">${file.name}</span>
                            <span style="color: #666; font-size: 12px;">${fileSize}</span>
                        </div>
                    </div>
                `;
                insertTextAtCursor(fileElement);
            }
        }
    };

    // 이미지 업로드
    const handleUploadImage = () => {
        const imageInput = document.createElement('input');
        imageInput.type = 'file';
        imageInput.accept = 'image/*';
        imageInput.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const imageDataUrl = event.target.result;
                    insertTextAtCursor(`<img src="${imageDataUrl}" alt="${file.name}" style="max-width: 100%; height: auto; margin: 10px 0; border-radius: 5px;" />`);
                };
                reader.onerror = () => {
                    insertTextAtCursor(`[이미지: ${file.name} - 읽기 실패]`);
                };
                reader.readAsDataURL(file);
            }
        };
        imageInput.click();
    };

    // 코드로 만들기
    const handleFormatCode = () => {
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            const selectedText = selection.toString();
            
            if (selectedText) {
                const codeText = `<pre style="background-color: #f4f4f4; padding: 15px; border-radius: 5px; margin: 10px 0;"><code>${selectedText}</code></pre>`;
                range.deleteContents();
                const fragment = range.createContextualFragment(codeText);
                range.insertNode(fragment);
                range.collapse(false);
                selection.removeAllRanges();
                selection.addRange(range);
                setContent(editorRef.current.innerHTML);
            } else {
                insertTextAtCursor(`<pre style="background-color: #f4f4f4; padding: 15px; border-radius: 5px; margin: 10px 0;"><code>코드를 입력하세요</code></pre>`);
            }
        }
    };

    // 이모지
    const handleEmojiClick = (emoji) => {
        insertTextAtCursor(emoji);
        setShowEmojiModal(false);
    };

    const handleToggleEmojiModal = () => {
        setShowEmojiModal(!showEmojiModal);
    };

    // Bold체 적용
    const handleBoldText = () => {
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            const selectedText = selection.toString();
            
            if (selectedText) {
                const boldText = `<strong>${selectedText}</strong>`;
                range.deleteContents();
                const fragment = range.createContextualFragment(boldText);
                range.insertNode(fragment);
                range.collapse(false);
                selection.removeAllRanges();
                selection.addRange(range);
                setContent(editorRef.current.innerHTML);
            } else {
                insertTextAtCursor(`<strong>굵은 텍스트</strong>`);
            }
        }
    };

    // 항목 추가
    const handleAddList = () => {
        insertTextAtCursor(`<ul style="margin: 10px 0; padding-left: 20px;"><li>항목 1</li><li>항목 2</li><li>항목 3</li></ul>`);
    };

    // 타임라인 추가
    const handleTimeline = () => {
        const now = new Date();
        const timestamp = now.toLocaleString('ko-KR');
        insertTextAtCursor(`<div style="margin: 10px 0;">⏰ ${timestamp}: </div>`);
    };

    // 미리보기
    const handleTogglePreview = () => {
        setShowPreview(!showPreview);
    };

    const renderPreview = (text) => {
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/```\n(.*?)\n```/gs, '<pre style="background-color: #f4f4f4; padding: 15px; border-radius: 5px; overflow-wrap: break-word;"><code>$1</code></pre>')
            .replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" style="max-width: 100%; height: auto; margin: 10px 0;" />')
            .replace(/\[첨부파일: (.*?)\]/g, '<span style="background-color: #e3f2fd; padding: 4px 8px; border-radius: 4px; color: #1976d2;">📎 $1</span>')
            .replace(/\n/g, '<br>')
            .replace(/--- (.*?) ---\n(.*?)\n--- 파일 끝 ---/gs, '<div style="border: 1px solid #ddd; padding: 15px; margin: 10px 0; border-radius: 5px;"><h4 style="margin-top: 0;">📄 $1</h4><pre style="background-color: #f9f9f9; padding: 10px; white-space: pre-wrap;">$2</pre></div>');
    };

    const handleDownloadPDF = () => {
        const printWindow = window.open('', '_blank');
        const htmlContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>공지사항</title>
                <meta charset="UTF-8">
                <style>
                    body {
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                        line-height: 1.6;
                        margin: 40px;
                        color: #333;
                    }
                    h1 {
                        color: #2c3e50;
                        border-bottom: 2px solid #eee;
                        padding-bottom: 10px;
                    }
                    pre {
                        background-color: #f4f4f4;
                        padding: 15px;
                        border-radius: 5px;
                        overflow-wrap: break-word;
                        white-space: pre-wrap;
                    }
                </style>
            </head>
            <body>
                <h1>공지사항</h1>
                <div>${content || '내용이 없습니다.'}</div>
                <script>
                    window.onload = function() {
                        window.print();
                        window.onafterprint = function() {
                            window.close();
                        }
                    }
                </script>
            </body>
            </html>
        `;
        
        printWindow.document.write(htmlContent);
        printWindow.document.close();
    };

    return (
        <form>
            <input
                ref={fileInputRef}
                type="file"
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
            
            <div className="w-full mb-4 mt-7 rounded-lg bg-secondary-3">
                <div className="flex items-center justify-between px-3 py-2 border-b border-gray-200">
                    <div className="flex flex-wrap items-center divide-gray-200 sm:divide-x sm:rtl:divide-x-reverse dark:divide-gray-600">
                        <div className="flex items-center space-x-1 rtl:space-x-reverse sm:pe-6">
                            <button 
                                type="button" 
                                onClick={handleAttachFile}
                                className="p-2 text-gray-500 rounded-sm cursor-pointer border border-transparent transition-colors hover:bg-secondary-10 hover:border-secondary-50 focus-within:border-secondary-50"
                            >
                                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 20">
                                    <path stroke="currentColor" strokeLinejoin="round" strokeWidth="2" d="M1 6v8a5 5 0 1 0 10 0V4.5a3.5 3.5 0 1 0-7 0V13a2 2 0 0 0 4 0V6"/>
                                </svg>
                                <span className="sr-only">Attach file</span>
                            </button>
                            
                            <button 
                                type="button" 
                                onClick={handleUploadImage}
                                className="p-2 text-gray-500 rounded-sm cursor-pointer border border-transparent transition-colors hover:bg-secondary-10 hover:border-secondary-50 focus-within:border-secondary-50"
                            >
                                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                                    <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z"/>
                                    <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z"/>
                                </svg>
                                <span className="sr-only">Upload image</span>
                            </button>
                            
                            <button 
                                type="button" 
                                onClick={handleFormatCode}
                                className="p-2 text-gray-500 rounded-sm cursor-pointer border border-transparent transition-colors hover:bg-secondary-10 hover:border-secondary-50 focus-within:border-secondary-50"
                            >
                                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                                    <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z"/>
                                    <path d="M14.067 0H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.933-2ZM6.709 13.809a1 1 0 1 1-1.418 1.409l-2-2.013a1 1 0 0 1 0-1.412l2-2a1 1 0 0 1 1.414 1.414L5.412 12.5l1.297 1.309Zm6-.6-2 2.013a1 1 0 1 1-1.418-1.409l1.3-1.307-1.295-1.295a1 1 0 0 1 1.414-1.414l2 2a1 1 0 0 1-.001 1.408v.004Z"/>
                                </svg>
                                <span className="sr-only">Format code</span>
                            </button>
                            
                            <div className="relative">
                                <button 
                                    ref={emojiButtonRef}
                                    type="button" 
                                    onClick={handleToggleEmojiModal}
                                    className="p-2 text-gray-500 rounded-sm cursor-pointer border border-transparent transition-colors hover:bg-secondary-10 hover:border-secondary-50 focus-within:border-secondary-50"
                                >
                                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM13.5 6a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm-7 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm3.5 9.5A5.5 5.5 0 0 1 4.6 11h10.81A5.5 5.5 0 0 1 10 15.5Z"/>
                                    </svg>
                                    <span className="sr-only">Add emoji</span>
                                </button>
                                
                                {showEmojiModal && (
                                    <div 
                                        ref={emojiModalRef}
                                        className="absolute top-full left-0 mt-1 z-50 bg-white border border-gray-200 rounded-lg shadow-lg p-3"
                                        style={{ width: '280px', maxHeight: '200px', overflowY: 'auto' }}
                                    >
                                        <div className="grid grid-cols-10 gap-1">
                                            {emojis.map((emoji, index) => (
                                                <button
                                                    key={index}
                                                    type="button"
                                                    onClick={() => handleEmojiClick(emoji)}
                                                    className="w-6 h-6 text-lg hover:bg-gray-100 rounded flex items-center justify-center transition-colors"
                                                    style={{ fontSize: '16px' }}
                                                >
                                                    {emoji}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <button 
                                type="button" 
                                onClick={handleBoldText}
                                className="p-2 text-gray-500 rounded-sm cursor-pointer border border-transparent transition-colors hover:bg-secondary-10 hover:border-secondary-50 focus-within:border-secondary-50"
                                >
                                <div className="w-4 h-4 flex items-center justify-center">
                                    <span className="text-body-l font-black">B</span>
                                </div>
                                <span className="sr-only">Bold text</span>
                            </button>
                        </div>
                        
                        <div className="flex flex-wrap items-center space-x-1 rtl:space-x-reverse sm:ps-6">
                            <button 
                                type="button" 
                                onClick={handleAddList}
                                className="p-2 text-gray-500 rounded-sm cursor-pointer border border-transparent transition-colors hover:bg-secondary-10 hover:border-secondary-50 focus-within:border-secondary-50"
                            >
                                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 18">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.5 3h9.563M9.5 9h9.563M9.5 15h9.563M1.5 13a2 2 0 1 1 3.321 1.5L1.5 17h5m-5-15 2-1v6m-2 0h4"/>
                                </svg>
                                <span className="sr-only">Add list</span>
                            </button>

                            <button 
                                type="button" 
                                onClick={handleTimeline}
                                className="p-2 text-gray-500 rounded-sm cursor-pointer border border-transparent transition-colors hover:bg-secondary-10 hover:border-secondary-50 focus-within:border-secondary-50"
                            >
                                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M18 2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2ZM2 18V7h6.7l.4-.409A4.309 4.309 0 0 1 15.753 7H18v11H2Z"/>
                                    <path d="M8.139 10.411 5.289 13.3A1 1 0 0 0 5 14v2a1 1 0 0 0 1 1h2a1 1 0 0 0 .7-.288l2.886-2.851-3.447-3.45ZM14 8a2.463 2.463 0 0 0-3.484 0l-.971.983 3.468 3.468.987-.971A2.463 2.463 0 0 0 14 8Z"/>
                                </svg>
                                <span className="sr-only">Timeline</span>
                            </button>
                            
                            <button 
                                type="button" 
                                onClick={handleDownloadPDF}
                                className="p-2 text-gray-500 rounded-sm cursor-pointer border border-transparent transition-colors hover:bg-secondary-10 hover:border-secondary-50 focus-within:border-secondary-50"
                            >
                                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z"/>
                                    <path d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"/>
                                </svg>
                                <span className="sr-only">Download PDF</span>
                            </button>
                        </div>
                    </div>
                    
                    <button 
                        type="button" 
                        onClick={handleTogglePreview}
                        className={`px-3 py-1 rounded-sm cursor-pointer border border-transparent transition-colors hover:bg-secondary-10 hover:border-secondary-50 ${
                            showPreview ? 'text-primary-100 bg-primary-10' : 'text-gray-500'
                        }`}
                    >
                        <span className="text-caption-semibold text-center">Preview</span>
                    </button>
                </div>
                
                <div className="mt-4 bg-secondary-3 rounded-lg transition-colors border border-transparent focus-within:border-secondary-50 h-55">
                    {showPreview ? (
                        <div className="p-3 h-full overflow-y-auto">
                            <div 
                                className="text-body-s text-secondary-80"
                                dangerouslySetInnerHTML={{
                                    __html: content || '<span style="color: #999;">프리뷰할 내용이 없습니다</span>'
                                }}
                            />
                        </div>
                    ) : (
                        <div
                            ref={editorRef}
                            contentEditable={true}
                            onInput={handleEditorChange}
                            className="resize-none block w-full h-full text-body-s text-secondary-80 bg-transparent outline-none border-none rounded-lg px-3 py-1 min-h-full overflow-y-auto"
                            style={{ 
                                minHeight: '200px',
                                color: content ? 'inherit' : '#999'
                            }}
                            suppressContentEditableWarning={true}
                            data-placeholder={content ? '' : '공지사항을 입력하세요'}
                        />
                    )}
                </div>
            </div>
        </form>
    );
}
