/**
 *  Run:
 *  $ entitas generate -p vala
 *
 * changes to Makefile:
 *
 *    remove src/Bosco/ESS/Entity.gs
 *
 *    add gen/Bosco/ECS/Entity.gs
 *    add gen/GeneratedComponents.gs
 *
 *
 */
namespace Bosco.ECS {
  public class Entity : EntityBase {
    public Entity(string[] componentsEnum, int totalComponents=32) {
      base(componentsEnum, totalComponents);
    }
  }
}
