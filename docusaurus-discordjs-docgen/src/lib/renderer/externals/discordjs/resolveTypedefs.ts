const baseLink = 'https://discord.js.org/#/docs/main/stable/typedef';

const knownTypeDefs = new Set([
	'ActivitiesOptions',
	'ActivityOptions',
	'ActivityParty',
	'ActivityPlatform',
	'ActivityTimestamps',
	'ActivityType',
	'AddApplicationCommandPermissionsOptions',
	'AddGuildMemberOptions',
	'AgentOptions',
	'APIError',
	'APIMessageActionRowComponent',
	'APIRequest',
	'ApplicationAsset',
	'ApplicationCommandData',
	'ApplicationCommandOption',
	'ApplicationCommandOptionChoice',
	'ApplicationCommandOptionData',
	'ApplicationCommandOptionType',
	'ApplicationCommandPermissionData',
	'ApplicationCommandPermissions',
	'ApplicationCommandPermissionType',
	'ApplicationCommandResolvable',
	'ApplicationCommandType',
	'ApplicationResolvable',
	'AuditLogAction',
	'AuditLogActionType',
	'AuditLogChange',
	'AuditLogEntryTarget',
	'AuditLogTargetType',
	'AwaitMessageComponentOptions',
	'AwaitMessagesOptions',
	'AwaitReactionsOptions',
	'BanOptions',
	'Base64Resolvable',
	'BaseApplicationCommandPermissionsOptions',
	'BaseFetchOptions',
	'BaseMessageComponentOptions',
	'BaseMessageOptions',
	'BitFieldResolvable',
	'BroadcastEvalOptions',
	'BufferResolvable',
	'CacheFactory',
	'CategoryChannelResolvable',
	'CategoryCreateChannelOptions',
	'ChannelData',
	'ChannelLogsQueryOptions',
	'ChannelPosition',
	'ChannelResolvable',
	'ChannelType',
	'ChannelWebhookCreateOptions',
	'ClientOptions',
	'ClientPresenceStatus',
	'ClientUserEditData',
	'CollectorFilter',
	'CollectorOptions',
	'CollectorResetTimerOptions',
	'ColorResolvable',
	'CommandInteractionOption',
	'CommandInteractionResolvedData',
	'Constants',
	'CreateInviteOptions',
	'CreateRoleOptions',
	'CrosspostedChannel',
	'DateResolvable',
	'DeconstructedSnowflake',
	'DefaultMessageNotificationLevel',
	'EditGuildTemplateOptions',
	'EmbedField',
	'EmbedFieldData',
	'EmojiIdentifierResolvable',
	'EmojiResolvable',
	'EscapeMarkdownOptions',
	'ExplicitContentFilterLevel',
	'Features',
	'FetchApplicationCommandOptions',
	'FetchArchivedThreadOptions',
	'FetchBanOptions',
	'FetchBansOptions',
	'FetchChannelOptions',
	'FetchedThreads',
	'FetchGuildOptions',
	'FetchGuildsOptions',
	'FetchInviteOptions',
	'FetchInvitesOptions',
	'FetchMemberOptions',
	'FetchMembersOptions',
	'FetchReactionUsersOptions',
	'FetchRecommendedShardsOptions',
	'FetchThreadsOptions',
	'FileOptions',
	'GuildApplicationCommandPermissionData',
	'GuildAuditLogsFetchOptions',
	'GuildBanResolvable',
	'GuildChannelCloneOptions',
	'GuildChannelCreateOptions',
	'GuildChannelOverwriteOptions',
	'GuildChannelResolvable',
	'GuildCreateOptions',
	'GuildEditData',
	'GuildEmojiCreateOptions',
	'GuildEmojiEditData',
	'GuildInvitableChannelResolvable',
	'GuildListMembersOptions',
	'GuildMemberEditData',
	'GuildMemberResolvable',
	'GuildMembersChunk',
	'GuildPruneMembersOptions',
	'GuildResolvable',
	'GuildRolePosition',
	'GuildSearchMembersOptions',
	'GuildStickerCreateOptions',
	'GuildStickerEditData',
	'GuildTemplateResolvable',
	'GuildTextChannelResolvable',
	'GuildVoiceChannelResolvable',
	'GuildWidgetSettings',
	'GuildWidgetSettingsData',
	'HasApplicationCommandPermissionsOptions',
	'HTTPAttachmentData',
	'HTTPErrorData',
	'HTTPOptions',
	'ImageURLOptions',
	'IntegrationAccount',
	'IntegrationExpireBehavior',
	'IntegrationType',
	'IntentsResolvable',
	'InteractionCollectorOptions',
	'InteractionDeferReplyOptions',
	'InteractionDeferUpdateOptions',
	'InteractionReplyOptions',
	'InteractionResponseType',
	'InteractionType',
	'InteractionUpdateOptions',
	'InvalidRequestWarningData',
	'InviteGenerationOptions',
	'InviteResolvable',
	'InviteScope',
	'LifetimeFilterOptions',
	'LimitedCollectionOptions',
	'MakeErrorOptions',
	'MembershipState',
	'MessageActionRowComponent',
	'MessageActionRowComponentOptions',
	'MessageActionRowComponentResolvable',
	'MessageActionRowOptions',
	'MessageActivity',
	'MessageButtonOptions',
	'MessageButtonStyle',
	'MessageButtonStyleResolvable',
	'MessageCollectorOptions',
	'MessageComponent',
	'MessageComponentCollectorOptions',
	'MessageComponentOptions',
	'MessageComponentType',
	'MessageComponentTypeResolvable',
	'MessageEditOptions',
	'MessageEmbedAuthor',
	'MessageEmbedFooter',
	'MessageEmbedImage',
	'MessageEmbedOptions',
	'MessageEmbedProvider',
	'MessageEmbedThumbnail',
	'MessageEmbedVideo',
	'MessageFile',
	'MessageInteraction',
	'MessageMentionOptions',
	'MessageMentionsHasOptions',
	'MessageMentionTypes',
	'MessageOptions',
	'MessageReactionResolvable',
	'MessageReference',
	'MessageResolvable',
	'MessageSelectMenuOptions',
	'MessageSelectOption',
	'MessageSelectOptionData',
	'MessageTarget',
	'MessageType',
	'MFALevel',
	'MultipleShardRespawnOptions',
	'MultipleShardSpawnOptions',
	'NSFWLevel',
	'OverwriteData',
	'OverwriteResolvable',
	'OverwriteType',
	'Partial',
	'PartialChannelData',
	'PartialOverwriteData',
	'PartialRecipient',
	'PartialRoleData',
	'PartialType',
	'PermissionOverwriteOptions',
	'PermissionResolvable',
	'PremiumTier',
	'PresenceData',
	'PresenceResolvable',
	'PresenceStatus',
	'PresenceStatusData',
	'PrivacyLevel',
	'RateLimitData',
	'RateLimitQueueFilter',
	'RawEmoji',
	'RawOverwriteData',
	'ReactionCollectorOptions',
	'RemoveApplicationCommandPermissionsOptions',
	'ReplyMessageOptions',
	'ReplyOptions',
	'ResolvedOverwriteOptions',
	'RoleData',
	'RoleResolvable',
	'SetApplicationCommandPermissionsOptions',
	'SetChannelPositionOptions',
	'SetParentOptions',
	'SetRolePositionOptions',
	'ShardingManagerMode',
	'ShardingManagerOptions',
	'ShardRespawnOptions',
	'Snowflake',
	'SplitOptions',
	'StageChannelResolvable',
	'StageInstanceCreateOptions',
	'StageInstanceEditOptions',
	'StartThreadOptions',
	'StaticImageURLOptions',
	'Status',
	'StickerFormatType',
	'StickerResolvable',
	'StickerType',
	'SweepFilter',
	'SystemChannelFlagsResolvable',
	'SystemMessageType',
	'TargetType',
	'TextBasedChannels',
	'TextBasedChannelTypes',
	'TextChannelResolvable',
	'ThreadAutoArchiveDuration',
	'ThreadChannelResolvable',
	'ThreadChannelTypes',
	'ThreadCreateOptions',
	'ThreadEditData',
	'ThreadMemberResolvable',
	'TimestampStylesString',
	'UserResolvable',
	'Vanity',
	'VerificationLevel',
	'VoiceBasedChannelTypes',
	'VoiceChannelResolvable',
	'WebhookClientData',
	'WebhookEditData',
	'WebhookEditMessageOptions',
	'WebhookFetchMessageOptions',
	'WebhookMessageOptions',
	'WebhookType',
	'WebsocketOptions',
	'WelcomeChannelData',
	'WelcomeScreenEditData',
	'WidgetActivity',
	'WidgetChannel',
	'WSEventType'
]);

export function resolveTypeDefs(name: string): string | undefined {
	if (knownTypeDefs.has(name)) {
		return `${baseLink}/${name}`;
	}

	return undefined;
}
