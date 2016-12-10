/**
 *
 * Replacement generated classes for testing
 *
 * In a regular application, these will be replaced
 * with classes generated by entitas-cli
 *
 */
namespace Bosco.ECS {
    public const int POOL_SIZE = 128;
    public class Entity : EntityBase {
    public Entity(string[] componentsEnum, int totalComponents=32) {
      base(componentsEnum, totalComponents);
    }
  }
  public class World : WorldBase {
    public static string[] componentsEnum;
    public static int totalComponents;
    public static World instance; 
    public World(string[] components, int startCreationIndex=0) {
      base(components, startCreationIndex);
    }

  }
  
}
