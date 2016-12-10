# build shmupwarz

#
# Application NAME
#
NAME=shmupwarz

# vala compiler
VC=valac --vapidir=./vapi
# mingw for windows executables
CC=--cc=i586-mingw32msvc-gcc
# vala flags
# -g debug
# -w
FLAGS=--disable-warnings
DEBUG=-g --save-temps

#
# vala core libs
# reference the vala libs at /usr/share/vala/vapi
#
LIBS=--pkg glib-2.0 \
			--pkg gobject-2.0 \
			--pkg gee-0.8 \
			--pkg sdl2 \
			--pkg SDL2_gfx \
			--pkg SDL2_image \
			--pkg SDL2_ttf \
			--pkg gio-2.0

TST=test/src/Vunny.gs \
		test/src/Should.gs \
		test/src/Test.gs \
		test/src/To.gs \
		test/TestFX.gs

APP=gen/GeneratedComponents.gs \
		src/game/Entities.gs \
		src/game/systems/DestroySystem.gs \
		src/game/systems/ColorTweenSystem.gs \
		src/game/systems/ExpiringSystem.gs \
		src/game/systems/MovementSystem.gs \
		src/game/systems/RenderPositionSystem.gs \
		src/game/systems/ViewManagerSystem.gs \
		src/game/systems/PlayerInputSystem.gs \
		src/game/systems/EntitySpawningTimerSystem.gs \
		src/game/systems/CollisionSystem.gs \
		src/game/systems/RemoveOffscreenShipsSystem.gs \
		src/game/systems/ScaleTweenSystem.gs \
		src/game/systems/HudRenderSystem.gs \
		src/game/Game.gs


#
# source code for this project
#
SOURCES=src/DarkMatter.vala \
			src/Utils/UUID.vala \
			src/Bosco/Bag.gs \
			src/Bosco/Events/EntityReleased.gs \
			src/Bosco/Events/ComponentReplaced.gs \
			src/Bosco/Events/EntityChanged.gs \
			src/Bosco/Events/WorldChanged.gs \
			src/Bosco/Events/GroupsChanged.gs \
			src/Bosco/Events/GroupChanged.gs \
			src/Bosco/Events/GroupUpdated.gs \
			src/Bosco/Interfaces/IComponent.vala \
			src/Bosco/Interfaces/ISystem.vala \
			src/Bosco/Interfaces/IMatcher.vala \
			src/Bosco/ECS/EntityBase.gs \
			gen/Entity.gs \
			src/Bosco/ECS/Group.gs \
			gen/Matching.gs \
			src/Bosco/ECS/Matcher.gs \
			src/Bosco/ECS/WorldBase.gs \
			gen/World.gs \
			src/Bosco/Timer.gs \
			src/Bosco/Sprite.gs \
			src/Bosco/AbstractGame.gs

ORIGINAL=src/DarkMatter.vala \
			src/Utils/UUID.vala \
			src/Bosco/Events/EntityReleased.gs \
			src/Bosco/Events/ComponentReplaced.gs \
			src/Bosco/Events/EntityChanged.gs \
			src/Bosco/Events/WorldChanged.gs \
			src/Bosco/Events/GroupsChanged.gs \
			src/Bosco/Events/GroupChanged.gs \
			src/Bosco/Events/GroupUpdated.gs \
			src/Bosco/Interfaces/IComponent.vala \
			src/Bosco/Interfaces/ISystem.vala \
			src/Bosco/Interfaces/IMatcher.vala \
			src/Bosco/ECS/EntityBase.gs \
			src/Bosco/ECS/Entity.vala \
			src/Bosco/ECS/Group.gs \
			src/Bosco/ECS/Matcher.gs \
			src/Bosco/ECS/WorldBase.gs \
			src/Bosco/ECS/World.vala \
			src/Bosco/Timer.gs \
			src/Bosco/Sprite.gs \
			src/Bosco/AbstractGame.gs

OLD=src/DarkMatter.vala \
		old/Game.vala \
		old/AbstractGame.vala \
		old/Texture.vala

#
# c libs needed for the gcc compiler
#
CLIBS=-X -lm \
			-X -lSDL_gfx

#
# c flags needed for the gcc compiler
#
CFLAGS=-X -w \
			-X -I/usr/include/SDL2

#
# Folder for finished binaries
#
BIN=build
.PHONY: build

#
# Resouce location
#
RESOURCES=resources

default: $(BIN)/$(NAME)
$(BIN)/$(NAME): $(SOURCES) $(APP)
	-mkdir -p $(BIN)
	cp -R --force $(RESOURCES) $(BIN)
	$(VC) $(FLAGS) $(LIBS) $(CLIBS) $(CFLAGS) $(SOURCES) $(APP) -o $(BIN)/$(NAME)
#	$(VC) $(DEBUG) $(FLAGS) $(LIBS) $(CLIBS) $(CFLAGS) $(SOURCES) $(APP) -o $(BIN)/$(NAME)

# default: $(BIN)/$(NAME)
# $(BIN)/$(NAME): $(OLD)
# 	-mkdir -p $(BIN)
# 	cp -R --force $(RESOURCES) $(BIN)
# 	$(VC) $(FLAGS) $(LIBS) $(CLIBS) $(CFLAGS) $(OLD) -o $(BIN)/$(NAME)

test: test/$(BIN)/$(NAME)
test/$(BIN)/$(NAME): $(SOURCES) $(TST)
	-mkdir -p test/$(BIN)
	cp -R --force $(RESOURCES) test/$(BIN)
	$(VC) $(FLAGS) $(LIBS) $(CLIBS) $(CFLAGS) $(SOURCES) $(TST) -o test/$(BIN)/$(NAME)
	test/$(BIN)/$(NAME)
	rm --force test/$(BIN)/$(NAME)

run: $(BIN)/$(NAME)
	$(BIN)/$(NAME)

clean:
	rm -rf $(BIN)/*.o

debug: debug/$(BIN)/$(NAME)
debug/$(BIN)/$(NAME): $(SOURCES) $(TST)
	-mkdir -p $(BIN)
	cp -R --force $(RESOURCES) $(BIN)
	$(VC) $(DEBUG) $(LIBS) $(CLIBS) $(CFLAGS) $(SOURCES) $(APP) -o $(BIN)/$(NAME)

# install:
# 	cp -f bin/webkat /usr/local/bin
# 	-mkdir /usr/local/share/icons
# 	cp -fr src/icon.png /usr/local/share/icons/webkat.png
#
# uninstall:
# 	rm -f /usr/local/bin/webkat
# 	rm -f /usr/local/share/icons/webkat.png
