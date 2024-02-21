import { ZookeeperClient } from '../pkgs/zookeeper-client';
import { env } from '$env/dynamic/private';
import type { ComptusCountry, ComptusLanguage, SignUpRespData, Comptus } from '../pkgs/zookeeper-client';
import { Left, Right, isLeft } from '../pkgs/either';
import { type Either } from '../pkgs/either';

const client = new ZookeeperClient(env.ZOOKEEPER_BASE_URL, true);

export const signUp = async (email: string, password: string, country: ComptusCountry, language: ComptusLanguage): Promise<Either<string, SignUpRespData>> => {
  const result = await client.signUp(email, password, country, language);
  if (isLeft(result)) {
    return Left(result.value);
  }

  return Right(result.value.data);
};

export const getMe = async (token: string): Promise<Either<string, Comptus>> => {
  const result = await client.getMe(token);
  if (isLeft(result)) {
    return Left(result.value);
  }

  return Right(result.value.data);
};
