# ShmupWars - Vala

Revisiting.

I've factored GLib.Object out of the inheritance chain. Gnome calls these a Non-Object classes.

Game objects have no need for GObject capabilities at this time.

In the example, the update callback rarely takes longer then 1 ms to execute

