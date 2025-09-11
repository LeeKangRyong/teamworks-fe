// emoji
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


// markdown -> html로 미리보기 느낌
export const parseMarkdown = (markdown) => {
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