/**
 * @file Tuit Dao interface for implementing CRUD operations
 */
import Tuit from "../../models/Tuit";

/**
 * @interface TuitDao interface
 */
export default interface TuitDao {
  /**
   * Find all tuits
   * @returns array of tuit
   */
  findAllTuits(): Promise<Tuit[]>;
  /**
   * Find tuit by user id
   * @param {string}uid user id
   * @returns array of tuit
   */
  findTuitsByUser(uid: string): Promise<Tuit[]>;
  /**
   * Find one tuit by the tuit id
   * @param {string}tid tuid id
   * @returns tuit
   */
  findTuitById(tid: string): Promise<Tuit>;
  /**
   * Create new tuit
   * @param {tuit}tuit tuit
   * @returns tuit
   */
  createTuit(tuit: Tuit): Promise<Tuit>;
  /**
   * Update tuit
   * @param {string}tid tuit id
   * @param {tuit}tuit tuit to be updated
   * @returns update status
   */
  updateTuit(tid: string, tuit: Tuit): Promise<any>;
  /**
   * delete tuit
   * @param {string}tid tuit id
   * @returns delete status
   */
  deleteTuit(tid: string): Promise<any>;
}
