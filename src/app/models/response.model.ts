export interface ResponseModel {
  readonly user: {
    multiFactor: { user: { uid: string } };
  };
}
