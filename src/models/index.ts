import User from "./user";
import Organization from "./organisation";
import OrganizationMember from "./organisationMember";
import Document from "./document";
import Conversation from "./conversation";
import Message from "./message";

User.hasMany(Organization, {
    foreignKey: "owner_id",
});

Organization.belongsTo(User, {
    foreignKey: "owner_id",
});

Organization.hasMany(Document, {
    foreignKey: "organization_id",
});

Document.belongsTo(Organization, {
    foreignKey: "organization_id",
});

User.hasMany(Conversation, {
    foreignKey: "user_id",
});

Conversation.belongsTo(User, {
    foreignKey: "user_id",
});

Organization.hasMany(Conversation, {
    foreignKey: "organization_id",
});

Conversation.belongsTo(Organization, {
    foreignKey: "organization_id",
});

Conversation.hasMany(Message, {
    foreignKey: "conversation_id",
});

Message.belongsTo(Conversation, {
    foreignKey: "conversation_id",
});

export {
    User,
    Organization,
    OrganizationMember,
    Document,
    Conversation,
    Message,
};