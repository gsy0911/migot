import React, { useCallback, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';
import { SecretsManagerClient, CancelRotateSecretCommand } from "@aws-sdk/client-secrets-manager";

const useStyles = makeStyles( (theme) => ({
	root: {
		color: theme.palette.primary.main
	}
}))

const region = 'ap-northeast-1';
const client = new SecretsManagerClient({ region: region });


export const SecretListContainer: React.FC = () => {
	const classes = useStyles();

	const [secretsName, setSecretsName] = useState<string>('');
	const [secrets, setSecrets] = useState<string>('');

	const onClickSecretsNameButton = useCallback(() => {
		setSecretsName('helllo')
	}, [''])

	// const onChangeSecretsName = useCallback((e: ChangeEvent<HTMLInputElement>) => {
	// 	const secretName = e.currentTarget.value;
	// 	client.getSecretValue({SecretId: secretName}, function(err, data) {
	// 		if (err) {
	// 			if (err.code === 'DecryptionFailureException')
	// 				// Secrets Manager can't decrypt the protected secret text using the provided KMS key.
	// 				// Deal with the exception here, and/or rethrow at your discretion.
	// 				throw err;
	// 			else if (err.code === 'InternalServiceErrorException')
	// 				// An error occurred on the server side.
	// 				// Deal with the exception here, and/or rethrow at your discretion.
	// 				throw err;
	// 			else if (err.code === 'InvalidParameterException')
	// 				// You provided an invalid value for a parameter.
	// 				// Deal with the exception here, and/or rethrow at your discretion.
	// 				throw err;
	// 			else if (err.code === 'InvalidRequestException')
	// 				// You provided a parameter value that is not valid for the current state of the resource.
	// 				// Deal with the exception here, and/or rethrow at your discretion.
	// 				throw err;
	// 			else if (err.code === 'ResourceNotFoundException')
	// 				// We can't find the resource that you asked for.
	// 				// Deal with the exception here, and/or rethrow at your discretion.
	// 				throw err;
	// 		}
	// 		else {
	// 			// Decrypts secret using the associated KMS CMK.
	// 			// Depending on whether the secret is a string or binary, one of these fields will be populated.
	// 			if ('SecretString' in data) {
	// 				return data.SecretString;
	// 			}
	// 		}
	// 		return ''
	// 	});
	// }, [''])
	return (
		<div>
			<TextField
				type="search"
				label="secrets name"
				variant="outlined"
				/>
			{secretsName}
			<Button aria-label="find secrets" onClick={onClickSecretsNameButton}>
				button
			</Button>
		</div>
	)
}
