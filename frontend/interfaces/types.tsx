export interface Subcategory {
    name: string;
    content: string;
}

export interface IWiki {
    id: number;
    name: string;
    color: string;
    subcategories: Subcategory[];
}

export interface PostObj {
    id: string;
    author: string[];
    description: string;
}

export interface GroupObj {
    groupname: string;
    description: string;
    admin: string;
    groupmembers: [(string | null)[]];
    language: string;
    location: string;
    image: string;
}

export interface IGroup {
    groupId: string;
    groupname: string;
    description: string;
    admin: string;
    groupmembers: [(string | null)[]];
    language: string;
    image: string;
    joinGroup: (id: string) => void;
    memberOfGroup: (id: string) => boolean;
}

export interface IGroupModal {
    groupId: string;
    groupName: string;
    modalVisible: boolean;
    setVisible: () => void;
    description: string;
    language: string;
    joinGroup: (id: string) => void;
}

export interface IGroupInfoModal {
    groupName: string;
    modalVisible: boolean;
    setVisible: () => void;
    description: string;
    language: string;
}

export interface ICommentProps {
    id: number;
    content: string;
    userName: string;
}

export interface Message {
    _id: string;
    text: string;
    createdAt: Date;
    user: {
        _id: string;
        name: string;
        avatar: string;
    };
}

export interface User {
    id: string;
    name: string;
}

export interface ChatMessage {
    id: string;
    userName: string;
    messageTime: string;
    messageText: string;
}
