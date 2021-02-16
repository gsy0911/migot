export interface ISecretsResponse {
	status: "invalid" | "valid";
	data?: ISecretData[];
}

export interface ISecretData {
	name: string;
	primaryId: string;
	secondaryId?: string;
	passphrase: string;
	url?: string;
	tags?: ISecretDataTag[];
}

export interface ISecretDataTag {
	key: string;
	value: string;
}
