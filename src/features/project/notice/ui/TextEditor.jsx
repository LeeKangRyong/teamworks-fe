import { useState, useRef, useEffect } from "react";

export function TextEditor() {
    const [content, setContent] = useState("");
    const [showEmojiModal, setShowEmojiModal] = useState(false);
    const [showHeadingModal, setShowHeadingModal] = useState(false);
    const [showPreview, setShowPreview] = useState(false);
    const [currentFontSize, setCurrentFontSize] = useState(14);
    const [attachedFiles, setAttachedFiles] = useState([]);
    const textareaRef = useRef(null);
    const emojiButtonRef = useRef(null);
    const emojiModalRef = useRef(null);
    const headingButtonRef = useRef(null);
    const headingModalRef = useRef(null);

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

    const headingOptions = [
        { label: 'H1', value: '# ', description: '큰 제목' },
        { label: 'H2', value: '## ', description: '중간 제목' },
        { label: 'H3', value: '### ', description: '작은 제목' }
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
            
            if (showHeadingModal &&
                headingModalRef.current &&
                !headingModalRef.current.contains(event.target) &&
                headingButtonRef.current &&
                !headingButtonRef.current.contains(event.target)) {
                setShowHeadingModal(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showEmojiModal, showHeadingModal]);

    // Markdown -> HTML
    const parseMarkdown = (markdown) => {
        let html = markdown
            .replace(/^### (.*$)/gm, '<h3 class="!text-xl !font-bold !mb-1 !mt-2">$1</h3>')
            .replace(/^## (.*$)/gm, '<h2 class="!text-2xl !font-bold !mb-1 !mt-2">$1</h2>')
            .replace(/^# (.*$)/gm, '<h1 class="!text-3xl !font-bold !mb-2 !mt-2">$1</h1>')
            .replace(/\*\*(.*?)\*\*/g, '<strong class="!font-bold">$1</strong>')
            .replace(/\*(.*?)\*/g, '<em class="!italic">$1</em>')
            .replace(/`(.*?)`/g, '<code class="!bg-gray-100 !px-1 !py-0.5 !rounded !font-mono !text-sm">$1</code>')
            .replace(/\[([^\]]+)\]\(([^\)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="!text-blue-600 !underline">$1</a>')
            .replace(/!\[([^\]]*)\]\(([^\)]+)\)/g, '<img src="$2" alt="$1" class="!max-w-full !h-auto !my-2 !rounded !block" style="display: block !important;" />')
            .replace(/\n/g, '<br>');

        html = html.replace(/^[-*+] (.+)$/gm, '<li class="!ml-4 !mb-1">$1</li>');
        html = html.replace(/(<li.*?<\/li>)/gs, '<ul class="!list-disc !pl-5 !my-2">$1</ul>');
        html = html.replace(/<\/ul><br><ul>/g, '');

        return html;
    };

    const insertTextAtCursor = (text) => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const currentContent = textarea.value;
        
        const newContent = currentContent.substring(0, start) + text + currentContent.substring(end);
        setContent(newContent);
        
        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(start + text.length, start + text.length);
        }, 0);
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };
    
    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const handleDownloadFile = (fileData) => {
        const url = URL.createObjectURL(fileData.file);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileData.file.name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleRemoveFile = (index) => {
        setAttachedFiles(prev => prev.filter((_, i) => i !== index));
    };

    const handleUploadImage = () => {
        const imageInput = document.createElement('input');
        imageInput.type = 'file';
        imageInput.accept = 'image/*';
        imageInput.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                setAttachedFiles(prev => [...prev, { file, type: 'image' }]);
            }
        };
        imageInput.click();
    };

    const handleAttachFile = () => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                setAttachedFiles(prev => [...prev, { file, type: 'file' }]);
            }
        };
        fileInput.click();
    };

    const handleEmojiClick = (emoji) => {
        insertTextAtCursor(emoji);
        setShowEmojiModal(false);
    };

    const handleToggleEmojiModal = () => {
        setShowEmojiModal(!showEmojiModal);
    };

    const handleHeadingClick = (headingValue) => {
        insertTextAtCursor(headingValue);
        setShowHeadingModal(false);
    };

    const handleToggleHeadingModal = () => {
        setShowHeadingModal(!showHeadingModal);
    };

    const handleTogglePreview = () => {
        setShowPreview(!showPreview);
    };

    const handleBoldText = () => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = textarea.value.substring(start, end);
        
        if (selectedText) {
            const boldText = `**${selectedText}**`;
            const newContent = textarea.value.substring(0, start) + boldText + textarea.value.substring(end);
            setContent(newContent);
            
            setTimeout(() => {
                textarea.focus();
                textarea.setSelectionRange(start + 2, start + 2 + selectedText.length);
            }, 0);
        } else {
            insertTextAtCursor('**굵은 텍스트**');
        }
    };

    const handleAddList = () => {
        insertTextAtCursor('- 목록 항목');
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
                        font-size: 2rem !important;
                        font-weight: bold !important;
                        margin-bottom: 1rem !important;
                        margin-top: 1.5rem !important;
                    }
                    h2 {
                        color: #2c3e50;
                        font-size: 1.5rem !important;
                        font-weight: bold !important;
                        margin-bottom: 0.75rem !important;
                        margin-top: 1.25rem !important;
                    }
                    h3 {
                        color: #2c3e50;
                        font-size: 1.25rem !important;
                        font-weight: bold !important;
                        margin-bottom: 0.5rem !important;
                        margin-top: 1rem !important;
                    }
                    ul {
                        margin: 10px 0;
                        padding-left: 20px;
                        list-style-type: disc;
                    }
                    li {
                        margin: 5px 0;
                    }
                    code {
                        background-color: #f4f4f4;
                        padding: 2px 4px;
                        border-radius: 3px;
                        font-family: monospace;
                    }
                    img {
                        max-width: 100%;
                        height: auto;
                        margin: 10px 0;
                        border-radius: 5px;
                    }
                    a {
                        color: #3498db;
                        text-decoration: none;
                    }
                    a:hover {
                        text-decoration: underline;
                    }
                    strong {
                        font-weight: bold !important;
                    }
                    em {
                        font-style: italic;
                    }
                </style>
            </head>
            <body>
                <h1>공지사항</h1>
                <div>${parseMarkdown(content) || '내용이 없습니다.'}</div>
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
        <div>
            {/* 첨부 파일 */}
            <div className="mb-4 min-h-18">
                <h3 className="text-body-s text-secondary-80 mt-6 !font-bold">첨부된 파일</h3>
                {attachedFiles.length > 0 ? (
                    <div 
                        className="flex gap-2 overflow-x-auto h-12" 
                        style={{ 
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none'
                        }}
                    >
                        <style jsx>{`
                            div::-webkit-scrollbar {
                                display: none;
                            }
                        `}</style>
                        {attachedFiles.map((fileData, index) => (
                            <div 
                                key={index}
                                className="flex items-center bg-gray-10 border border-gray-10 rounded-md px-3 py-2 text-body-s hover:bg-gray-20 transition-colors group flex-shrink-0 h-12"
                            >
                                <div 
                                    className="flex items-center cursor-pointer flex-1"
                                    onClick={() => handleDownloadFile(fileData)}
                                >
                                    <span className="mr-2 text-body-s">
                                        {fileData.type === 'image' ? '🖼️' : '📋️'}
                                    </span>
                                    
                                    <div className="flex flex-col min-w-0">
                                        <span className="text-caption-semibold text-secondary-60 truncate max-w-24 text-xs">
                                            {fileData.file.name}
                                        </span>
                                        <span className="text-caption-regular text-secondary-50">
                                            {formatFileSize(fileData.file.size)}
                                        </span>
                                    </div>
                                    
                                </div>
                                
                                <button
                                    onClick={() => handleRemoveFile(index)}
                                    className="ml-1 text-gray-30 hover:text-gray-40 transition-colors"
                                    title="파일 삭제"
                                >
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-caption-regular text-secondary-30 h-6 flex items-center mt-2">
                        첨부된 파일이 없습니다.
                    </div>
                )}
            </div>

            <div className="w-full mb-4 mt-4 rounded-lg bg-secondary-3">
                <div className="flex items-center justify-between px-3 py-2 border-b border-gray-200">
                    <div className="flex flex-wrap items-center divide-gray-200 sm:divide-x sm:rtl:divide-x-reverse dark:divide-gray-600">
                        <div className="flex items-center space-x-1 rtl:space-x-reverse sm:pe-6">
                            
                            {/* 파일 첨부 */}
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

                            {/* 사진 */}
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

                            {/* 제목 */}
                            <div className="relative">
                                <button 
                                    ref={headingButtonRef}
                                    type="button" 
                                    onClick={handleToggleHeadingModal}
                                    className="p-2 text-gray-500 rounded-sm cursor-pointer border border-transparent transition-colors hover:bg-secondary-10 hover:border-secondary-50 focus-within:border-secondary-50"
                                >
                                    <div className="w-4 h-4 flex items-center justify-center">
                                        <span className="text-body-m !font-bold">H</span>
                                    </div>
                                    <span className="sr-only">Add heading</span>
                                </button>
                                
                                {showHeadingModal && (
                                    <div 
                                        ref={headingModalRef}
                                        className="absolute top-full left-0 mt-1 z-50 bg-white border border-gray-200 rounded-lg shadow-lg p-2"
                                        style={{ width: '160px' }}
                                    >
                                        {headingOptions.map((heading) => (
                                            <button
                                                key={heading.label}
                                                type="button"
                                                onClick={() => handleHeadingClick(heading.value)}
                                                className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 transition-colors flex items-center justify-between"
                                            >
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-sm">{heading.label}</span>
                                                    <span className="text-xs text-gray-500">{heading.description}</span>
                                                </div>
                                                <span className="text-xs text-gray-400 font-mono">{heading.value.trim()}</span>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                            
                            {/* 이모티콘 */}
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

                            {/* 글씨 굵게 */}
                            <button 
                                type="button" 
                                onClick={handleBoldText}
                                className="p-2 text-gray-500 rounded-sm cursor-pointer border border-transparent transition-colors hover:bg-secondary-10 hover:border-secondary-50 focus-within:border-secondary-50"
                            >
                                <div className="w-4 h-4 flex items-center justify-center">
                                    <span className="text-body-l !font-black">B</span>
                                </div>
                                <span className="sr-only">Bold text</span>
                            </button>
                        </div>
                        
                        <div className="flex flex-wrap items-center space-x-1 rtl:space-x-reverse sm:ps-6">
                            
                            {/* 항목 */}
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

                            {/* Preview 버튼 */}
                            <button 
                                type="button" 
                                onClick={handleTogglePreview}
                                className={`p-2 rounded-sm cursor-pointer border border-transparent transition-colors hover:bg-secondary-10 hover:border-secondary-50 focus-within:border-secondary-50 ${
                                    showPreview ? 'text-blue-600 bg-blue-50' : 'text-gray-500'
                                }`}
                            >
                                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 14">
                                    <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                                        <path d="M10 10c1.646 0 3-1.354 3-3s-1.354-3-3-3-3 1.354-3 3 1.354 3 3 3Z"/>
                                        <path d="M10 13c4.446 0 8-2.543 8-5.714a9.016 9.016 0 0 0-.402-2.558C16.697 2.65 13.716 1 10 1S3.303 2.65 2.402 4.728A9.016 9.016 0 0 0 2 7.286C2 10.457 5.554 13 10 13Z"/>
                                    </g>
                                </svg>
                                <span className="sr-only">Preview</span>
                            </button>
                            
                            {/* PDF 다운로드 */}
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
                </div>
                
                <div className="mt-1 bg-secondary-3 rounded-lg transition-colors border border-transparent focus-within:border-secondary-50 h-55">
                    {!showPreview ? (
                        // Markdown 모드
                        <textarea
                            ref={textareaRef}
                            value={content}
                            onChange={handleContentChange}
                            className="resize-none block w-full h-full text-body-s text-secondary-80 bg-transparent outline-none border-none rounded-lg px-3 py-1 min-h-full overflow-y-auto"
                            style={{ 
                                minHeight: '200px',
                                color: content ? 'inherit' : '#999',
                                fontSize: currentFontSize + 'px',
                            }}
                            placeholder="공지사항을 입력하세요"
                        />
                    ) : (
                        // Preview 모드
                        <div 
                            className="block w-full h-full text-body-s text-secondary-80 bg-transparent rounded-lg px-3 py-1 min-h-full overflow-y-auto prose prose-sm max-w-none"
                            style={{ 
                                minHeight: '200px',
                                fontSize: currentFontSize + 'px',
                                lineHeight: '1.6'
                            }}
                            dangerouslySetInnerHTML={{ 
                                __html: content ? parseMarkdown(content) : '<p style="color: #999;">미리보기할 내용이 없습니다.</p>' 
                            }}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}