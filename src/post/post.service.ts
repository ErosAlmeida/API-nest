import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';

import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async create(dto: CreatePostDto, author: User) {
    const post = this.postRepository.create({
      slug: 'asdflbcvcvcvc-' + Math.random().toString(36).substring(2, 8),
      title: dto.title,
      excerpt: dto.excerpt,
      content: dto.content,
      author,
    });

    const created = await this.postRepository.save(post);
    return created;
  }
}
